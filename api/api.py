from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/balance_sheet.db'

db = SQLAlchemy(app)



if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run(debug=True)