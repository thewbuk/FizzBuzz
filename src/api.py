from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])
app.config['JWT_SECRET_KEY'] = 'super-secret'
jwt = JWTManager(app)

users = {
    "test": "password123",
}


@app.route('/login', methods=['POST'])
def login():
    try:
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
    except Exception as e:
        print(e)
        return jsonify({"msg": "An error occurred."}), 500


@app.route('/fizzbuzz', methods=['GET'])
@jwt_required()
def fizzbuzz():
    username = get_jwt_identity()
    if username not in users:
        return jsonify({"msg": "Invalid user"}), 401

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
