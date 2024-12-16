from flask import Blueprint, request, jsonify
from extensions import mongo
from middlewares.auth import role_required
from bson import ObjectId

admin_bp = Blueprint('admin', __name__)

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

@admin_bp.route('/orientadores/<id>', methods=['DELETE'])
@role_required('admin')
def delete_orientador(id):
    mongo.db.users.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Orientador eliminado"}), 200


@admin_bp.route('/orientadores', methods=['GET'])
@role_required('admin')
def get_orientadores():
    orientadores = [
        {"_id": str(orientador["_id"]), "email": orientador["email"]}
        for orientador in mongo.db.users.find({"role": "orientador"}, {"_id": 1, "email": 1})
]
    return jsonify(orientadores), 200
