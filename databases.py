import sqlite3 as sql


products_conn = sql.connect("db/products.db", check_same_thread=False)
prod_cur = products_conn.cursor()

def retrieve_products():
    prod_cur.execute("SELECT * FROM products")
    return prod_cur.fetchall()