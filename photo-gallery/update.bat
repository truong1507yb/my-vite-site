@echo off
chcp 65001 > nul
echo ==================================================
echo     TIẾN TRÌNH CẬP NHẬT CODE & RESTART SERVER VPS
echo ==================================================

:: Di chuyển vào thư mục dự án trên VPS
cd /d C:\photo-gallery

echo 1. Đang lấy mã nguồn mới nhất từ GitHub...
git pull origin main

echo 2. Cập nhật thư viện trong môi trường ảo...
call venv\Scripts\activate
pip install -r requirements.txt
pip install waitress

echo 3. Khởi động lại dịch vụ chạy ngầm Flask (Waitress)...
nssm restart FlaskPhotoGallery

echo 4. Tải lại cấu hình Nginx...
cd /d C:\nginx
nginx -s reload

echo ==================================================
echo         ĐÃ CẬP NHẬT THÀNH CÔNG VÀ KÍCH HOẠT!
echo ==================================================
pause
