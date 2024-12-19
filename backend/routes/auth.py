from flask import Blueprint, Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from bson import ObjectId
from extensions import mongo
from flask_cors import CORS

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], methods=["POST"])

# Registro
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
    role = data.get('role')

    if role not in ['alumno', 'orientador', 'admin']:
        return jsonify({"error": "Rol inválido"}), 400

    if mongo.db.users.find_one({"email": email}):
        return jsonify({"error": "El usuario ya existe"}), 400

    mongo.db.users.insert_one({"email": email, "password": password, "role": role, "citas": []})
    return jsonify({"message": "Usuario registrado exitosamente"}), 201

# Login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = mongo.db.users.find_one({"email": email})
    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({"error": "Credenciales inválidas"}), 401

    token = create_access_token(identity=str(user['_id']), additional_claims={"role": user['role']})
    return jsonify({
        "token": token,
        "role": user['role'] 
    }), 200
