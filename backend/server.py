from flask import Flask,request,jsonify
from flask_cors import CORS
from pymongo import MongoClient

app=Flask(__name__)
CORS(app)

# -----------database connection------------
client=MongoClient('mongodb://localhost:27017/')
db=client['mydatabase']
collection=db['users']

@app.route("/")
def home():
    return "<h1>prasanth</h1>"

@app.route("/user-data",methods=['POST'])
def userData():
    data=request.get_json()
    collection.insert_one(data)
    return jsonify({"message": "data stored in DB success"})

if __name__=="__main__":
    app.run(debug=True,port=7000)


