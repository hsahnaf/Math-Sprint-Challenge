from flask import Flask, jsonify, request

app = Flask(__name__)

questions = [
    {"question": "What is 2 + 2?", "answer": "4"},
    {"question": "What is the capital of France?", "answer": "Paris"},
    {"question": "What is the largest planet?", "answer": "Jupiter"}
]

@app.route('/get-question', methods=['GET'])
def get_question():
    import random
    return jsonify(random.choice(questions))

if __name__ == '__main__':
    app.run(debug=True)
