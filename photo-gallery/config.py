import os

# Load .env file manually into os.environ
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
if os.path.exists(env_path):
    with open(env_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, val = line.split('=', 1)
                os.environ[key.strip()] = val.strip()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'photo_gallery_secret_key_2026_trust')
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    
    # Database
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'database.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Upload Settings
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10 MB limit
    
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')
    ORIGINAL_FOLDER = os.path.join(UPLOAD_FOLDER, 'original')
    THUMB_FOLDER = os.path.join(UPLOAD_FOLDER, 'thumbs')
    DISPLAY_FOLDER = os.path.join(UPLOAD_FOLDER, 'display')
    
    # Ensure upload directories exist
    @classmethod
    def init_app(cls, app):
        for folder in [cls.ORIGINAL_FOLDER, cls.THUMB_FOLDER, cls.DISPLAY_FOLDER]:
            os.makedirs(folder, exist_ok=True)
