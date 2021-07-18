# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/balance_sheet.db'
app.config['SQLALCHEMY_BINDS'] = {
    'pocket_stock': 'sqlite:///data/pocket_stock.db',
    'stockinfo': 'sqlite:///data/balance_sheet.db',
    'stock_name_id': 'sqlite:///data/stockinfo.db'
}

db = SQLAlchemy(app)

class StockInfo(object):
    __table_args__ = {'extend_existing': True}
    id = db.Column('index', db.Integer, primary_key=True)
    date = db.Column('date', db.String, nullable=False)
    cash = db.Column('現金及約當現金', db.Float, nullable=True)
    total = db.Column('資產總額', db.Float, nullable=True)

def stock_serializer(stock):
    return {
        'index': stock.id,
        'date': stock.date,
        'cash': stock.cash,
        'total': stock.total
    }

names = ['_1101', '_2317', '_2330', '_3481']
stocks = []
for name in names:
    n = type(name.title(), (StockInfo, db.Model), {'__tablename__': name})
    stocks.append(n)

@app.route('/api/allStock')
def index():
    for stock in stocks:
        results = db.session.query(stock).all()
        print(results)
        for r in results:
            print(r.date)
    read_data = db.session.query(stocks[1]).all()
    print('read_data:', read_data)
    return jsonify([*map(stock_serializer, read_data)])


class PocketStock(db.Model):
    __bind_key__ = 'pocket_stock'
    __tablename__ = 'stock'
    stockid = db.Column('stock_id', db.Integer, primary_key=True)
    # stockname = db.Column('stockname', db.String, nullable=False)

def stockid_serializer(stock):
    return {
        'stockid': stock.stockid,
        # 'stockname': stock.stockname
    }

@app.route('/add_pocket_stock', methods=['POST', 'GET'])
def addStock():
    if request.method == 'POST':
        request_data = json.loads(request.data)
        stock = PocketStock(stockid = request_data['stockid'])
        db.session.add(stock)
        db.session.commit()
        return {
            '201': 'add stock successfully'
        }
    if request.method == 'GET':
        return jsonify([*map(stockid_serializer, PocketStock.query.all())])

@app.route('/remove_pocket_stock', methods=['GET', 'POST', 'DELETE'])
def removeStock():
    request_data = json.loads(request.data)
    PocketStock.query.filter_by(stockid = request_data['stockid']).delete()
    db.session.commit()
    return {
        '204': 'remove stock successfully'
    }


class StockIdName(db.Model):
    __bind_key__ = 'stock_name_id'
    __tablename__ = 'stock_name'
    id_and_name = db.Column('有價證券代號及名稱', db.String, primary_key=True)


def id_and_name_serializer(stock):
    return {
        'id_name': stock.id_and_name
    }

@app.route('/search', methods=['GET'])
def search_stock():
    read_data = jsonify([*map(id_and_name_serializer, StockIdName.query.all())])    
    return read_data


if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run(debug=True)
