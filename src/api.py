from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from flask_httpauth import HTTPTokenAuth
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'super-secret'
jwt = JWTManager(app)
auth = HTTPTokenAuth(scheme='Bearer')

users = {
    "test": "password123", 
}

@auth.verify_token
def verify_token(token):
    try:
        data = jwt.decode_token(token)
        return data['username'] in users
    except:
        return False

@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    params = request.get_json()
    username = params.get('username', None)
    password = params.get('password', None)

    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    if username not in users or users[username] != password:
        return jsonify({"msg": "Bad username or password"}), 401

    token = create_access_token(identity=username)
    return jsonify(access_token=token), 200

@app.route('/fizzbuzz', methods=['GET'])
@auth.login_required
def fizzbuzz():
    result = []
    for i in range(1, 101):
        if i % 3 == 0 and i % 5 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(i)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
