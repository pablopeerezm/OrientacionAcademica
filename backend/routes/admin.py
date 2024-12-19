from flask import Blueprint, request, jsonify
from extensions import mongo
from middlewares.auth import role_required
from bson import ObjectId

admin_bp = Blueprint('admin', __name__)

# Create orientador
@admin_bp.route('/orientadores', methods=['POST'])
@role_required('admin')
def add_orientador():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    mongo.db.users.insert_one({
        "email": email,
        "password": password,
        "role": "orientador",
        "citas": []
    })
    return jsonify({"message": "Orientador añadido"}), 201

# Delete orientador
@admin_bp.route('/orientadores/<email>', methods=['DELETE'])
@role_required('admin')
def delete_orientador(email):
    result = mongo.db.users.delete_one({"email": email})
    if result.deleted_count == 0:
        return jsonify({"message": "Orientador no encontrado"}), 404
    return jsonify({"message": "Orientador eliminado"}), 200

# Read orientadores
@admin_bp.route('/orientadores', methods=['GET'])
@role_required('admin')
def get_orientadores():
    orientadores = [
        {"_id": str(orientador["_id"]), "email": orientador["email"]}
        for orientador in mongo.db.users.find({"role": "orientador"}, {"_id": 1, "email": 1})
]
    return jsonify(orientadores), 200

# Read orientadores for alumno
@admin_bp.route('/orientadores2', methods=['GET'])
def get_orientadores2():
    orientadores = [
        { "email": orientador["email"]}
        for orientador in mongo.db.users.find({"role": "orientador"}, {"_id": 1, "email": 1})
]
    return jsonify(orientadores), 200

# Read alumnos for orientador
@admin_bp.route('/alumnos', methods=['GET'])
def alumnos():
    alumnos = [
        { "email": alumno["email"]}
        for alumno in mongo.db.users.find({"role": "alumno"}, {"_id": 1, "email": 1})
]
    return jsonify(alumnos), 200