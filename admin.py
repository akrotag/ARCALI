from flask import Flask, render_template, Blueprint	
from flask_login import login_user, login_required, logout_user, current_user
from hashlib import sha256

admin = Blueprint("admin", __name__)


@admin.route("/admin_gestion")
@login_required
def admin_homepage():
    return render_template("admin_index.html", user=current_user)