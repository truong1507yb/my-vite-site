from flask import session, redirect, url_for, flash
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
import os

# Default admin username and password (easy configuration via env variables)
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')

def check_admin_credentials(username, password):
    return username == ADMIN_USERNAME and password == ADMIN_PASSWORD

def login_admin():
    session['admin_logged_in'] = True
    session.permanent = True

def logout_admin():
    session.pop('admin_logged_in', None)

def is_admin_logged_in():
    return session.get('admin_logged_in', False) == True

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not is_admin_logged_in():
            flash('Vui lòng đăng nhập để truy cập trang này.', 'danger')
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated_function
