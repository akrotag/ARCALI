from flask import Blueprint, render_template, request, flash, redirect
from hashlib import sha256
import sqlite3 as sql
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)

@auth.route('login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['pass']

        user = User.query.filter_by(email=email).first()
        if user:
            if sha256(password.encode("utf-8")).hexdigest() == user.password:
                login_user(user, remember=True)
                return redirect('/')
            else:
                flash('mot de passe incorrect', category='error')
        else:
            flash("cet email n'est lié à aucun compte", category='error')

    return render_template('login.html', user=current_user)


@auth.route('signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        password1 = request.form['pass']

        user = User.query.filter_by(email=email).first()


        if user:
            flash('Un utilisateur utilise déjà cet email', category='error')
        elif len(password1) < 6:
            flash('Votre mot de passe est trop court', category='error')
        elif len(email) < 1:
            flash('Veuillez inscrire un email', category='error')
        elif len(lastname) < 1:
            flash('Veuillez inscrire un nom', category='error')
        elif len(firstname) < 1:
            flash('Veuillez inscrire un prénom', category='error')
        else:
            firstname = firstname[0].upper() + firstname[1:].lower()
            lastname = lastname[0].upper() + lastname[1:].lower()
            new_user= User(email=email, firstname=firstname, lastname=lastname, password=generate_password_hash(password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()

            login_user(new_user, remember=True)
            return redirect('/')

    return render_template('signup.html', user=current_user)


@auth.route('logout')
@login_required
def logout():
    logout_user()
    return redirect('login')