import os
from PIL import Image as PILImage, ImageDraw, ImageFont

def create_thumbnail(source_path, dest_path, max_size=(500, 500)):
    """Create a thumbnail with aspect ratio preserved, capped at max_size."""
    with PILImage.open(source_path) as img:
        if img.mode in ('RGBA', 'LA', 'P'):
            img = img.convert('RGB')
        img.thumbnail(max_size, PILImage.Resampling.LANCZOS)
        img.save(dest_path, 'JPEG', quality=85)

def generate_qr_image(link, size):
    """Generate a high-quality QR code image of specified size in RGBA."""
    import qrcode
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=4,
        border=1
    )
    qr.add_data(link)
    qr.make(fit=True)
    
    # Generate QR Code image (white background, black modules)
    qr_img = qr.make_image(fill_color="black", back_color="white").convert('RGBA')
    
    # Resize to target size
    return qr_img.resize((size, size), PILImage.Resampling.LANCZOS)

def create_display_image(source_path, dest_path, max_dim=1920, watermark_text=None, qr_link=None, add_verified=True, add_card=True):
    """
    Create a web-optimized display image.
    Resizes if larger than max_dim (preserving aspect ratio).
    Applies a premium glassmorphic copyright card containing:
      - Watermark Text
      - Facebook Verified Badge (Tích xanh)
      - Dynamic Verification QR Code (pointing to qr_link)
    """
    with PILImage.open(source_path) as img:
        w, h = img.size
        # 1. Resize if too large
        if max(w, h) > max_dim:
            if w > h:
                new_w = max_dim
                new_h = int(h * (max_dim / w))
            else:
                new_h = max_dim
                new_w = int(w * (max_dim / h))
            img = img.resize((new_w, new_h), PILImage.Resampling.LANCZOS)
            w, h = new_w, new_h
        
        # Ensure image is RGB/RGBA
        if img.mode not in ('RGB', 'RGBA'):
            img = img.convert('RGB')
            
        # 2. Apply Watermark if text is provided
        if watermark_text:
            # Convert to RGBA for transparent overlay drawing
            img_rgba = img.convert('RGBA')
            txt_overlay = PILImage.new('RGBA', img_rgba.size, (255, 255, 255, 0))
            draw = ImageDraw.Draw(txt_overlay)
            
            # Setup scale factor based on image size (base 1200px)
            scale = max(w, h) / 1200.0
            
            # Font size (around 28px for 1200px image width)
            font_size = max(14, int(26 * scale))
            
            # Load Font (fallback chain)
            font = None
            font_paths = [
                "C:\\Windows\\Fonts\\arialbd.ttf",
                "C:\\Windows\\Fonts\\arial.ttf",
                "C:\\Windows\\Fonts\\segoeui.ttf",
                "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
                "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
                "arial.ttf"
            ]
            for path in font_paths:
                if os.path.exists(path):
                    try:
                        font = ImageFont.truetype(path, font_size)
                        break
                    except Exception:
                        pass
            if not font:
                font = ImageFont.load_default()
                
            full_text = f"{watermark_text}"
            
            # Measure text width and height
            try:
                # Pillow 10.0+ method
                bbox = draw.textbbox((0, 0), full_text, font=font)
                txt_w = bbox[2] - bbox[0]
                txt_h = bbox[3] - bbox[1]
            except AttributeError:
                # Older Pillow method
                txt_w, txt_h = draw.textsize(full_text, font=font)
                
            # Component sizes
            badge_size = int(font_size * 0.85) if add_verified else 0
            badge_margin = int(8 * scale) if add_verified else 0
            
            qr_size = int(72 * scale) if qr_link else 0
            divider_w = int(24 * scale) if qr_link else 0
            
            # Padding sizes inside card
            pad_x = int(20 * scale) if add_card else 0
            pad_y = int(16 * scale) if add_card else 0
            
            # Bounding box of elements inside card
            left_w = txt_w + badge_margin + badge_size
            left_h = max(txt_h, badge_size)
            
            inner_w = left_w + divider_w + qr_size
            inner_h = max(left_h, qr_size)
            
            # Calculate final card size
            card_w = inner_w + pad_x * 2
            card_h = inner_h + pad_y * 2
            
            # Bottom right position with margin
            margin_edge = int(40 * scale)
            card_x = w - card_w - margin_edge
            card_y = h - card_h - margin_edge
            
            # 3. Draw Card Background (Glassmorphism look)
            if add_card:
                draw.rounded_rectangle(
                    [(card_x, card_y), (card_x + card_w, card_y + card_h)],
                    radius=int(12 * scale),
                    fill=(11, 15, 27, 185), # Dark transparent blue-gray
                    outline=(255, 255, 255, 28), # Translucent white border
                    width=max(1, int(1.5 * scale))
                )
                
            # Content coordinates helper
            cy = card_y + card_h / 2
            content_x = card_x + pad_x
            
            # 4. Draw Watermark Text
            draw.text(
                (content_x, cy - txt_h / 2),
                full_text,
                fill=(255, 255, 255, 220), # White text
                font=font
            )
            
            # 5. Draw Facebook Verification Badge (Tích xanh)
            if add_verified:
                bx = content_x + txt_w + badge_margin + badge_size / 2
                
                # Blue circle container
                draw.ellipse(
                    [(bx - badge_size / 2, cy - badge_size / 2), 
                     (bx + badge_size / 2, cy + badge_size / 2)],
                    fill='#1877f2'
                )
                
                # White checkmark tick
                lw = max(1, int(badge_size * 0.13))
                p1 = (bx - badge_size * 0.18, cy - badge_size * 0.02)
                p2 = (bx - badge_size * 0.04, cy + badge_size * 0.12)
                p3 = (bx + badge_size * 0.18, cy - badge_size * 0.12)
                draw.line([p1, p2, p3], fill='white', width=lw, joint='round')
                
            # 6. Draw Divider Line
            if qr_link:
                div_x = content_x + left_w + divider_w / 2
                draw.line(
                    [(div_x, card_y + pad_y), (div_x, card_y + card_h - pad_y)],
                    fill=(255, 255, 255, 40), # Thin translucent white line
                    width=1
                )
                
                # 7. Draw QR Code
                qr_x = int(content_x + left_w + divider_w)
                qr_y = int(cy - qr_size / 2)
                
                # Generate and paste QR image
                qr_img = generate_qr_image(qr_link, qr_size)
                txt_overlay.paste(qr_img, (qr_x, qr_y))
                
            # Merge layers
            combined = PILImage.alpha_composite(img_rgba, txt_overlay)
            img = combined.convert('RGB')
        else:
            if img.mode == 'RGBA':
                img = img.convert('RGB')
                
        # Save as optimized JPEG
        img.save(dest_path, 'JPEG', quality=92)
