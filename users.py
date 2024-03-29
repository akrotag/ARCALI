from flask import Flask, render_template, Blueprint	
from flask_login import login_user, login_required, logout_user, current_user
from hashlib import sha256

from databases import retrieve_products

users = Blueprint("users", __name__)


@users.route("/index")
def users_index():
    return render_template("users_index.html", user=current_user, items=retrieve_products())
#@login_required

