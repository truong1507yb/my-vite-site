from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Image(db.Model):
    __tablename__ = 'images'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    caption = db.Column(db.Text, nullable=True)
    filename = db.Column(db.String(255), nullable=False, unique=True)
    thumbnail = db.Column(db.String(255), nullable=False, unique=True)
    
    # Custom display publish date (chosen by Admin)
    upload_date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    
    author = db.Column(db.String(100), nullable=False, default="Admin")
    watermark_enabled = db.Column(db.Boolean, nullable=False, default=True)
    sha256_hash = db.Column(db.String(64), nullable=True)
    
    # System timestamp of upload
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'caption': self.caption,
            'filename': self.filename,
            'thumbnail': self.thumbnail,
            'upload_date': self.upload_date.strftime('%Y-%m-%d'),
            'author': self.author,
            'watermark_enabled': self.watermark_enabled,
            'sha256_hash': self.sha256_hash,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
