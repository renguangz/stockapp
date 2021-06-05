# -*- coding: utf-8 -*-
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/balance_sheet.db'

db = SQLAlchemy(app)

class StockInfo(object):
    __table_args__ = {'extend_existing': True}
    id = db.Column('index', db.Integer, primary_key=True)
    date = db.Column('date', db.String, nullable=False)
    cash = db.Column('現金及約當現金', db.Float, nullable=True)
    total = db.Column('資產總額', db.Float, nullable=True)


names = ['_1101', '_2317', '_2330', '_3481']
stocks = []
for name in names:
    n = type(name.title(), (StockInfo, db.Model), {'__tablename__': name})
    stocks.append(n)

@app.route('/')
def index():
    for stock in stocks:
        results = db.session.query(stock).all()
        for r in results:
            print(r.date)
    for stock in stocks:
      print(stock)
    return ''








if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run(debug=True)