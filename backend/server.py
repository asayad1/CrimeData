from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
#from flask_marshmallow import Marshmallow
from flask_cors import CORS,cross_origin
import sqlite3
from threading import Lock
  
# Initializing flask app
app = Flask(__name__)
CORS(app)

conn  = sqlite3.connect('crimeDBFinal.db', check_same_thread=False)
c = conn.cursor()
lock = Lock()
#Below is the table name for the crime data
#   Crime_data_trimmed_2
#
#Below is the table name for the crime data
#   "Median_Household_Income"
# Route for get students
@app.route('/api/data')
#@cross_origin() used to need dont anymore
def get_data():
    #modify * with column names for each data base
    #this gets all data from both tables and pushes them to the front end
    #c.execute('SELECT * FROM Crime_data_trimmed_2 JOIN Median_Household_Income ON Crime_data_trimmed_2.RowID = Median_Household_Income.RowID')

    #this is for displaying just one table at a time
    #c.execute('SELECT * FROM Median_Household_Income')
    lock.acquire(True)
    c.execute('SELECT * FROM Crime_data_trimmed_2final')
    rows = c.fetchall()
    lock.release()
    return jsonify(rows)

@app.route('/api/data2')
#@cross_origin() used to need dont anymore
def get_data2():
    #modify * with column names for each data base
    #this gets all data from both tables and pushes them to the front end
    #c.execute('SELECT * FROM Crime_data_trimmed_2 JOIN Median_Household_Income ON Crime_data_trimmed_2.RowID = Median_Household_Income.RowID')

    #this is for displaying just one table at a time
    lock.acquire(True)
    c.execute('SELECT * FROM Median_Household_Income')
    #c.execute('SELECT * FROM Crime_data_trimmed_2')
    rows = c.fetchall()
    lock.release()
    return jsonify(rows)
      
# Running app
if __name__ == '__main__':
    app.run(debug=True)