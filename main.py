from flask import Flask, render_template, redirect
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from hashlib import sha256
from users import users
#example hash: sha256(string.encode('utf-8')).hexdigest()


app = Flask(__name__)


login_manager = LoginManager()
login_manager.login_view = 'users.login'
login_manager.init_app(app)
login_manager.login_message = 'Veuillez vous connecter pour avoir accès à cette page'

app.register_blueprint(users, url_prefix="/users")


@login_manager.user_loader
def load_user(user_id):
    return None
    """
   conn = sqlite3.connect('/var/www/flask/login.db')
   curs = conn.cursor()
   curs.execute("SELECT * from login where id = (?)",[user_id])
   lu = curs.fetchone()
   if lu is None:
      return None
   else:
      return User(int(lu[0]), lu[1], lu[2])"""

@app.route("/")
def hello():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")