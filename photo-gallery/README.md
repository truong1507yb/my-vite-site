# Desenio Photo Gallery System

Hệ thống triển khai website trưng bày ảnh nghệ thuật cá nhân cao cấp phong cách 500px, Unsplash, tích hợp tính năng tự tạo ảnh xem thử (optimized display), ảnh thu nhỏ (thumbnail) và tự động đóng dấu Watermark bản quyền mờ 25% ở góc dưới bên phải ảnh.

---

## 1. Cấu trúc thư mục dự án

```
photo-gallery/
├── app.py                  # Core routing, logic xử lý tải lên, sửa, xóa
├── config.py               # Cấu hình đường dẫn, dung lượng file, database
├── models.py               # Schema database hình ảnh (SQLAlchemy)
├── auth.py                 # Xác thực bảo mật Admin (session, scrypt)
├── watermark.py            # Đóng dấu watermark và tạo ảnh nhỏ (Pillow)
├── requirements.txt        # Các thư viện phụ thuộc
│
├── static/
│   ├── css/
│   │   ├── style.css       # Giao diện tối giản sang trọng (luxury minimal)
│   │   └── hero-placeholder.jpg
│   ├── js/
│   │   └── main.js         # Infinite scroll và hiệu ứng động
│   └── uploads/            # Tự động tạo khi chạy
│       ├── original/       # Lưu trữ ảnh gốc
│       ├── display/        # Ảnh xem thử (đã đóng dấu watermark nếu bật)
│       └── thumbs/         # Ảnh thu nhỏ cho danh sách Masonry Grid
│
└── templates/
    ├── base.html           # Layout khung dùng chung (Header & Footer)
    ├── index.html          # Trang chủ (Masonry Grid + Infinite Scroll)
    ├── image.html          # Chi tiết ảnh (Xem ảnh lớn + Chuyển ảnh Trước/Sau)
    ├── collections.html    # Trang Bộ sưu tập
    ├── about.html          # Trang tác giả / giới thiệu
    └── admin/
        ├── login.html      # Đăng nhập Admin
        ├── dashboard.html  # Quản lý tác phẩm (Danh sách, nút sửa/xóa)
        ├── upload.html     # Đăng tải ảnh (Có tùy chỉnh ngày & watermark)
        └── edit.html       # Chỉnh sửa thông tin ảnh
```

---

## 2. Hướng dẫn chạy thử ở máy cá nhân (Local)

1. Mở terminal tại thư mục `photo-gallery`.
2. Tạo môi trường ảo và cài đặt thư viện:
   ```bash
   python -m venv venv
   # Trên Windows:
   venv\Scripts\activate
   # Trên macOS/Linux:
   source venv/bin/activate
   
    
   ```
3. Chạy ứng dụng:
   ```bash
   python app.py
   ```
4. Mở trình duyệt truy cập: `http://127.0.0.1:5000`
5. Đăng nhập trang quản trị:
   * URL: `http://127.0.0.1:5000/admin/login`
   * Username mặc định: **`admin`**
   * Password mặc định: **`admin123`** (Bạn có thể đổi mật khẩu này bằng cách đặt biến môi trường `ADMIN_PASSWORD_HASH` hoặc cấu hình trong file `auth.py`).

---

## 3. Hướng dẫn Deploy lên Ubuntu VPS (Gunicorn + Nginx)

Khi bạn muốn chạy thực tế trên VPS Ubuntu, hãy làm theo quy trình chuẩn hóa sau:

### Bước 3.1: Cài đặt các thư viện cần thiết trên VPS
```bash
sudo apt update
sudo apt install python3-pip python3-venv python3-dev libjpeg-dev zlib1g-dev nginx -y
```

### Bước 3.2: Clone code và chuẩn bị môi trường
1. Di chuyển mã nguồn dự án `photo-gallery` lên VPS (Ví dụ đặt tại `/var/www/photo-gallery`).
2. Khởi tạo môi trường ảo và cài đặt thư viện:
   ```bash
   cd /var/www/photo-gallery
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

### Bước 3.3: Cấu hình Systemd Service chạy ngầm Gunicorn
Tạo file dịch vụ chạy nền cho ứng dụng Flask:
```bash
sudo nano /etc/systemd/system/photogallery.service
```
Dán nội dung sau vào:
```ini
[Unit]
Description=Gunicorn instance to serve Desenio Photo Gallery
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/photo-gallery
Environment="PATH=/var/www/photo-gallery/venv/bin"
Environment="NODE_SKIP_PLATFORM_CHECK=1"
ExecStart=/var/www/photo-gallery/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:5000 app:app

[Install]
WantedBy=multi-user.target
```
*Lưu ý: Chạy lệnh cấp quyền sở hữu thư mục cho user `www-data` để Flask có quyền ghi ảnh upload:*
```bash
sudo chown -R www-data:www-data /var/www/photo-gallery
```
Khởi chạy dịch vụ:
```bash
sudo systemctl start photogallery
sudo systemctl enable photogallery
```

### Bước 3.4: Cấu hình Nginx làm Web Server Reverse Proxy
Mở file cấu hình Nginx:
```bash
sudo nano /etc/nginx/sites-available/photogallery
```
Cấu hình trỏ tên miền của bạn về ứng dụng Gunicorn và cho phép Nginx phục vụ trực tiếp các file tĩnh (CSS, JS, Uploads) để đạt tốc độ tải ảnh nhanh nhất:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com; # Thay bằng tên miền của bạn

    # Phục vụ file tĩnh trực tiếp bằng Nginx để tăng tốc độ tải
    location /static/ {
        alias /var/www/photo-gallery/static/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Chuyển các request khác đến Flask (Gunicorn)
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        client_max_body_size 12M; # Cho phép upload file lớn
    }
}
```
Kích hoạt cấu hình và restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/photogallery /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Bước 3.5: Cài đặt chứng chỉ bảo mật SSL (HTTPS) miễn phí
Sử dụng Let's Encrypt Certbot để tự động lấy và cài đặt SSL:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```
*Hệ thống sẽ tự cấu hình lại file Nginx để tự động redirect toàn bộ traffic từ `http` sang `https` bảo mật.*
