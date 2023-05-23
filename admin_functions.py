import sqlite3 as sql

users_conn = sql.connect("databases/users.db")
users_cu = users_conn.cursor()

products_conn = sql.connect("databases/products.db")
products_cu = products_conn.cursor()

def reset_users_db():
    users_cu.execute("""DROP TABLE IF EXISTS checkout_users""")
    users_conn.commit()
    users_cu.execute("""CREATE TABLE IF NOT EXISTS checkout_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    type INT DEFAULT 0
    )""")
    users_conn.commit()



def add_user(username, password, type: int = 0):    
    users_cu.execute(f"""INSERT INTO checkout_users(username, password, type) VALUES ("{username}", "{password}", "{type}")""")
    users_conn.commit()

def create_products_db():
    products_cu.execute("""DROP TABLE IF EXISTS products""")
    products_conn.commit()
    products_cu.execute("""CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR NOT NULL,
    price INTEGER NOT NULL,
    img VARCHAR 
    )""")
    products_conn.commit()
