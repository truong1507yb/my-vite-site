import os
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session, abort
from werkzeug.utils import secure_filename
from config import Config
from models import db, Image
from auth import admin_required, check_admin_credentials, login_admin, logout_admin, is_admin_logged_in
import watermark

app = Flask(__name__)
app.config.from_object(Config)

# Initialize Database & Create directories
db.init_app(app)
Config.init_app(app)

# Calculate SHA-256 hash of a file helper
def calculate_file_sha256(filepath):
    import hashlib
    sha256_hash = hashlib.sha256()
    try:
        with open(filepath, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()
    except Exception as e:
        print(f"Error calculating hash: {e}")
        return None

# Create Database tables & perform SQLite migrations on startup
with app.app_context():
    db.create_all()
    # Check if sha256_hash column exists, if not, alter table
    try:
        connection = db.engine.raw_connection()
        cursor = connection.cursor()
        cursor.execute("PRAGMA table_info(images)")
        columns = [row[1] for row in cursor.fetchall()]
        if 'sha256_hash' not in columns:
            cursor.execute("ALTER TABLE images ADD COLUMN sha256_hash VARCHAR(64)")
            connection.commit()
            print("Successfully added sha256_hash column to images table via automatic migration")
        connection.close()
    except Exception as e:
        print(f"Error running database auto-migration: {e}")

# CSRF Protection: Inject CSRF token into all templates
@app.context_processor
def inject_csrf_token():
    if 'csrf_token' not in session:
        session['csrf_token'] = os.urandom(24).hex()
    return dict(csrf_token=session['csrf_token'])

# CSRF Protection check on all POST requests
@app.before_request
def csrf_protect():
    if request.method == "POST":
        # Ignore CSRF for non-admin API or specific tasks if necessary
        # But we protect all POST requests in this simple app
        token = request.form.get('csrf_token') or request.headers.get('X-CSRF-Token')
        if not token or token != session.get('csrf_token'):
            abort(400, "CSRF Token missing or invalid.")

# Allowed image extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- FRONTEND ROUTES ---

@app.route('/')
def index():
    # Fetch first page of images (Masonry grid)
    # Order by custom upload_date desc, then created_at desc (newest first)
    query = request.args.get('q', '').strip()
    if query:
        # Search query active
        images = Image.query.filter(
            (Image.title.like(f'%{query}%')) | 
            (Image.caption.like(f'%{query}%')) | 
            (Image.author.like(f'%{query}%'))
        ).order_by(Image.upload_date.desc(), Image.id.desc()).limit(12).all()
    else:
        images = Image.query.order_by(Image.upload_date.desc(), Image.id.desc()).limit(12).all()
        
    return render_template('index.html', images=images, query=query)

@app.route('/gallery')
def gallery():
    return redirect(url_for('index'))

@app.route('/collections')
def collections():
    # Simple static layout for portfolio collections
    return render_template('collections.html')

@app.route('/about')
def about():
    # Personal bio / brand story page
    return render_template('about.html')

@app.route('/api/images')
def api_images():
    # API for Infinite scroll / Load more
    page = int(request.args.get('page', 1))
    per_page = 12
    query = request.args.get('q', '').strip()
    
    if query:
        paginated = Image.query.filter(
            (Image.title.like(f'%{query}%')) | 
            (Image.caption.like(f'%{query}%')) | 
            (Image.author.like(f'%{query}%'))
        ).order_by(Image.upload_date.desc(), Image.id.desc()).paginate(page=page, per_page=per_page, error_out=False)
    else:
        paginated = Image.query.order_by(Image.upload_date.desc(), Image.id.desc()).paginate(page=page, per_page=per_page, error_out=False)
        
    items = [img.to_dict() for img in paginated.items]
    return jsonify({
        'images': items,
        'has_next': paginated.has_next,
        'next_page': paginated.next_num
    })

@app.route('/image/<int:image_id>')
def image_detail(image_id):
    image = Image.query.get_or_404(image_id)
    
    # Calculate Next and Previous images based on main feed order (upload_date desc, id desc)
    # Next image is older (lower upload_date, or same upload_date with lower id)
    next_image = Image.query.filter(
        (Image.upload_date < image.upload_date) | 
        ((Image.upload_date == image.upload_date) & (Image.id < image.id))
    ).order_by(Image.upload_date.desc(), Image.id.desc()).first()
    
    # Previous image is newer (higher upload_date, or same upload_date with higher id)
    prev_image = Image.query.filter(
        (Image.upload_date > image.upload_date) | 
        ((Image.upload_date == image.upload_date) & (Image.id > image.id))
    ).order_by(Image.upload_date.asc(), Image.id.asc()).first()
    
    # Use real file SHA-256 hash, fallback to filename hash for backward compatibility
    import hashlib
    image_hash = image.sha256_hash or hashlib.sha256(image.filename.encode()).hexdigest()
    
    return render_template('image.html', 
                           image=image, 
                           image_hash=image_hash,
                           next_id=next_image.id if next_image else None, 
                           prev_id=prev_image.id if prev_image else None)

# --- ADMIN ROUTES ---

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if is_admin_logged_in():
        return redirect(url_for('admin_dashboard'))
        
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if check_admin_credentials(username, password):
            login_admin()
            flash('Đăng nhập quản trị viên thành công!', 'success')
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Tên đăng nhập hoặc mật khẩu không chính xác.', 'danger')
            
    return render_template('admin/login.html')

@app.route('/admin/logout')
def admin_logout():
    logout_admin()
    flash('Đăng xuất thành công.', 'info')
    return redirect(url_for('admin_login'))

@app.route('/admin/dashboard')
@admin_required
def admin_dashboard():
    # Simple admin dashboard listing images
    images = Image.query.order_by(Image.created_at.desc()).all()
    total_images = len(images)
    return render_template('admin/dashboard.html', images=images, total_images=total_images)

@app.route('/admin/upload', methods=['GET', 'POST'])
@admin_required
def admin_upload():
    if request.method == 'POST':
        title = request.form.get('title', '').strip()
        caption = request.form.get('caption', '').strip()
        author = request.form.get('author', 'Admin').strip()
        watermark_enabled = 'watermark_enabled' in request.form
        
        # Parse custom upload date
        upload_date_str = request.form.get('upload_date')
        if upload_date_str:
            try:
                upload_date = datetime.strptime(upload_date_str, '%Y-%m-%d').date()
            except ValueError:
                upload_date = datetime.utcnow().date()
        else:
            upload_date = datetime.utcnow().date()
            
        # File Validation
        if 'image' not in request.files:
            flash('Không tìm thấy file ảnh tải lên.', 'danger')
            return redirect(request.url)
            
        file = request.files['image']
        if file.filename == '':
            flash('Vui lòng chọn một file ảnh.', 'danger')
            return redirect(request.url)
            
        if file and allowed_file(file.filename):
            # Safe filename generation to prevent file inclusion / path traversal
            orig_filename = secure_filename(file.filename)
            name, ext = os.path.splitext(orig_filename)
            timestamp = datetime.utcnow().strftime('%Y%m%d%H%M%S%f')
            unique_filename = f"{name}_{timestamp}{ext}"
            
            # Save original file
            orig_path = os.path.join(app.config['ORIGINAL_FOLDER'], unique_filename)
            file.save(orig_path)
            
            # Paths for display and thumb
            display_path = os.path.join(app.config['DISPLAY_FOLDER'], unique_filename)
            thumb_path = os.path.join(app.config['THUMB_FOLDER'], unique_filename)
            
            # Calculate SHA-256 hash of original image file
            sha256_val = calculate_file_sha256(orig_path)
            
            # Create database entry inside a transaction
            new_image = Image(
                title=title if title else "Không tiêu đề",
                caption=caption,
                filename=unique_filename,
                thumbnail=unique_filename,
                upload_date=upload_date,
                author=author,
                watermark_enabled=watermark_enabled,
                sha256_hash=sha256_val
            )
            db.session.add(new_image)
            db.session.flush() # Flush to get auto-increment ID
            
            # Generate verification link
            qr_link = f"{request.url_root}image/{new_image.id}"
            
            # Process display image and thumbnail
            watermark_text = author if watermark_enabled else None
            try:
                watermark.create_display_image(orig_path, display_path, watermark_text=watermark_text, qr_link=qr_link)
                watermark.create_thumbnail(orig_path, thumb_path)
            except Exception as e:
                db.session.rollback()
                flash(f'Lỗi khi xử lý ảnh bằng Pillow: {str(e)}', 'danger')
                # Clean up original file if processing failed
                if os.path.exists(orig_path):
                    os.remove(orig_path)
                return redirect(request.url)
            
            db.session.commit()
            flash('Tải ảnh và đóng dấu bản quyền thành công!', 'success')
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Định dạng file không hợp lệ. Chỉ cho phép: PNG, JPG, JPEG, WEBP.', 'danger')
            
    return render_template('admin/upload.html')

@app.route('/admin/edit/<int:image_id>', methods=['GET', 'POST'])
@admin_required
def admin_edit(image_id):
    image = Image.query.get_or_404(image_id)
    
    if request.method == 'POST':
        title = request.form.get('title', '').strip()
        caption = request.form.get('caption', '').strip()
        author = request.form.get('author', 'Admin').strip()
        watermark_enabled = 'watermark_enabled' in request.form
        
        # Parse custom date
        upload_date_str = request.form.get('upload_date')
        if upload_date_str:
            try:
                image.upload_date = datetime.strptime(upload_date_str, '%Y-%m-%d').date()
            except ValueError:
                pass
                
        # Check if watermark settings or author has changed -> regenerate display image
        watermark_changed = (image.watermark_enabled != watermark_enabled)
        author_changed = (image.author != author)
        
        image.title = title if title else "Không tiêu đề"
        image.caption = caption
        image.author = author
        image.watermark_enabled = watermark_enabled
        
        if watermark_changed or author_changed:
            orig_path = os.path.join(app.config['ORIGINAL_FOLDER'], image.filename)
            display_path = os.path.join(app.config['DISPLAY_FOLDER'], image.filename)
            watermark_text = author if watermark_enabled else None
            qr_link = f"{request.url_root}image/{image.id}"
            try:
                watermark.create_display_image(orig_path, display_path, watermark_text=watermark_text, qr_link=qr_link)
            except Exception as e:
                flash(f'Lỗi tái tạo hình ảnh: {str(e)}', 'danger')
                return redirect(request.url)
                
        db.session.commit()
        flash('Cập nhật thông tin ảnh thành công!', 'success')
        return redirect(url_for('admin_dashboard'))
        
    return render_template('admin/edit.html', image=image)

@app.route('/admin/delete/<int:image_id>', methods=['POST'])
@admin_required
def admin_delete(image_id):
    image = Image.query.get_or_404(image_id)
    filename = image.filename
    
    # Delete files on disk
    for folder in [app.config['ORIGINAL_FOLDER'], app.config['DISPLAY_FOLDER'], app.config['THUMB_FOLDER']]:
        file_path = os.path.join(folder, filename)
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception as e:
                app.logger.error(f"Lỗi khi xóa file {file_path}: {str(e)}")
                
    # Delete database record
    db.session.delete(image)
    db.session.commit()
    
    flash('Đã xóa ảnh thành công khỏi hệ thống.', 'success')
    return redirect(url_for('admin_dashboard'))

# Global robots.txt
@app.route('/robots.txt')
def robots():
    return "User-agent: *\nDisallow: /admin/\nSitemap: /sitemap.xml"

# Dynamic sitemap.xml for SEO
@app.route('/sitemap.xml')
def sitemap():
    images = Image.query.order_by(Image.created_at.desc()).all()
    xml = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    
    # Add static pages
    xml.append('  <url>')
    xml.append('    <loc>http://localhost/</loc>')
    xml.append('    <changefreq>daily</changefreq>')
    xml.append('    <priority>1.0</priority>')
    xml.append('  </url>')
    
    # Add dynamic image pages
    for img in images:
        xml.append('  <url>')
        xml.append(f'    <loc>http://localhost/image/{img.id}</loc>')
        xml.append(f'    <lastmod>{img.created_at.strftime("%Y-%m-%d")}</lastmod>')
        xml.append('    <changefreq>monthly</changefreq>')
        xml.append('    <priority>0.8</priority>')
        xml.append('  </url>')
        
    xml.append('</urlset>')
    return app.response_class('\n'.join(xml), mimetype='application/xml')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
