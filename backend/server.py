from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId 

app = Flask(__name__)
CORS(app)

# -----------database connection------------
client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
collection = db['users']

# -----------building the Api's----------------

@app.route("/")
def home():
    return "<h1>prasanth</h1>"

@app.route("/post-questions-data", methods=['POST'])
def questionsData():
    data = request.get_json()
    collection.insert_one(data)
    return jsonify({"message": "data stored in DB success"})

def convert_oid_to_str(data):
    """Convert ObjectId to string recursively in a dictionary or list."""
    if isinstance(data, list):
        return [convert_oid_to_str(item) for item in data]
    elif isinstance(data, dict):
        return {key: convert_oid_to_str(value) for key, value in data.items()}
    elif isinstance(data, ObjectId):
        return str(data)  
    return data 

@app.route("/get-questions-data", methods=['GET'])
def getQuestions():
    questions = list(collection.find({}, {'correctAnswer': 0}))
    questions = convert_oid_to_str(questions)
    return jsonify(questions)


@app.route("/delete-question/<string:question_id>", methods=['DELETE'])
def delete_question(question_id):
    result = collection.delete_one({"_id": ObjectId(question_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Question deleted successfully"}), 200
    else:
        return jsonify({"message": "Question not found"}), 404


@app.route("/update-question/<string:question_id>", methods=['PUT'])
def update_question(question_id):
    data = request.get_json()  

    updated_data = {
        "question": data.get("question"),
        "option1": data.get("options")[0],
        "option2": data.get("options")[1],
        "option3": data.get("options")[2],
        "option4": data.get("options")[3],
    }

    
    result = collection.update_one({"_id": ObjectId(question_id)}, {"$set": updated_data})
    
    if result.matched_count > 0:
        return jsonify({"message": "Question updated successfully"}), 200
    else:
        return jsonify({"message": "Question not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=7000)
