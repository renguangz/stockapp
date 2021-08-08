# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/cashFlow_sheet.db'
app.config['SQLALCHEMY_BINDS'] = {
    'pocket_stock': 'sqlite:///data/pocket_stock.db',
    'stockinfo': 'sqlite:///data/balance_sheet.db',
    'stock_name_id': 'sqlite:///data/stockinfo.db',
    'balance_sheet': 'sqlite:///data/balance_sheet.db',
    'income_sheet': 'sqlite:///data/income_sheet.db',
    'cashFlow_sheet': 'sqlite:///data/cashFlow_sheet.db',
}

db = SQLAlchemy(app)


class StockInfo(object):
    __table_args__ = {'extend_existing': True}
    id = db.Column('index', db.Integer, primary_key=True)
    date = db.Column('date', db.String, nullable=False)
    # cash = db.Column('現金及約當現金', db.Float, nullable=True)
    # total = db.Column('資產總額', db.Float, nullable=True)


def stock_serializer(stock):
    return {
        'index': stock.id,
        'date': stock.date,
        # 'cash': stock.cash,
        # 'total': stock.total
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
    stockid = db.Column('stock_id', db.String, primary_key=True)


def stockid_serializer(stock):
    return {
        'stockid': stock.stockid,
    }


@app.route('/add_pocket_stock', methods=['POST', 'GET'])
def addStock():
    if request.method == 'POST':
        request_data = json.loads(request.data)
        stock = PocketStock(stockid=request_data['stockid'])
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
    PocketStock.query.filter_by(stockid=request_data['stockid']).delete()
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

class Balance(object):
    __bind_key__ = 'balance_sheet'
    __table_args__ = {'extend_existing': True}
    id = db.Column('index', db.Integer, primary_key=True)
    date = db.Column('date', db.String, nullable=False)
    accounts_receivable = db.Column('應收帳款淨額', db.Float, nullable=False)
    accounts_payable = db.Column('應付帳款', db.Float, nullable=False)
    total_liabilities = db.Column('負債總額', db.Float, nullable=False)
    total_assets = db.Column('資產總額', db.Float, nullable=False)
    non_current_assets = db.Column('非流動資產合計', db.Float, nullable=False)
    stock_holders_equity = db.Column('權益總額', db.Float, nullable=True)

def balance_serializer(balance):
    return {
        'id': balance.id,
        'date': balance.date,
        'accounts_receivable': balance.accounts_receivable,
        'accounts_payable': balance.accounts_payable,
        'total_liabilities': balance.total_liabilities,
        'total_assets': balance.total_assets,
        'non_current_assets': balance.non_current_assets,
        'stock_holders_equity': balance.stock_holders_equity
    }

@app.route('/balance', methods=['POST', 'GET'])
def balance_display():
    if request.method == 'POST':
        request_data = json.loads(request.data)
        n = type('balance_' + request_data.get('table_name'), (Balance, db.Model), {'__tablename__': 'balance_' + request_data.get('table_name')})
    read_data = jsonify([*map(balance_serializer, n.query.all())])
    return read_data

class Income(object):
    __bind_key__ = 'income_sheet'
    __table_args__ = {'extend_existing': True}
    id = db.Column('index', db.Integer, primary_key=True)
    date = db.Column('date', db.String, nullable=False)
    benefit_total = db.Column('營業收入合計', db.Float, nullable=False)
    benefit = db.Column('營業利益（損失）', db.Float, nullable=False)
    cost_total = db.Column('營業成本合計', db.Float, nullable=False)
    non_operating_income = db.Column('營業外收入及支出合計', db.Float, nullable=False)
    profit_before_tax = db.Column('稅前淨利（淨損）', db.Float, nullable=False)
    # 稅後淨利, 每股盈餘

def income_serializer(income):
    return {
        'id': income.id,
        'date': income.date,
        'benefit_total': income.benefit_total,
        'benefit': income.benefit,
        'cost_total': income.cost_total,
        'non_operation_income': income.non_operating_income,
        'profit_before_tax': income.profit_before_tax
    }

@app.route('/income', methods=['POST', 'GET'])
def income_display():
    if request.method == 'POST':
        request_data = json.loads(request.data)
        n = type('_' + request_data.get('table_name'), (Income, db.Model), {'__tablename__': '_' + request_data.get('table_name')})

    read_data = jsonify([*map(income_serializer, n.query.all())])
    return read_data

class CashFlow(db.Model):
    __bind_key__ = 'cashFlow_sheet'
    __table_args__ = {'extend_existing': True}
    id = db.Column('index', db.Integer, primary_key=True)
    inventory = db.Column('存貨（增加）減少', db.Float, nullable=False)
    depreciation_expense = db.Column('折舊費用', db.Float, nullable=False)
    amortization_fee = db.Column('攤銷費用', db.Float, nullable=False)

def cash_serializer(cash):
    return {
        'id': cash.id,
        'inventory': cash.inventory,
        'depreciation_expense': cash.depreciation_expense,
        'amortization_fee': cash.amortization_fee
    }

@app.route('/cash')
def cash_display():
    read_data = jsonify([*map(cash_serializer, CashFlow.query.all())])
    return read_data



if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run(debug=True)
