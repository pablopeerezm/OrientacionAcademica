from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from extensions import mongo
from middlewares.auth import role_required
from models.models import create_cita_model
from bson import ObjectId


citas_bp = Blueprint('citas', __name__)

@citas_bp.route('/', methods=['GET'])
@jwt_required()
def get_citas():
    citas = list(mongo.db.citas.find())
    return jsonify(citas), 200

@citas_bp.route('/', methods=['POST'])
@jwt_required()
def create_cita():
    data = request.json
    cita = create_cita_model(data['alumno_id'], data['orientador_id'], data['fecha'], data['hora'])
    mongo.db.citas.insert_one(cita)
    return jsonify({"message": "Cita creada"}), 201

@citas_bp.route('/<id>', methods=['DELETE'])
@jwt_required()
def delete_cita(id):
    mongo.db.citas.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Cita eliminada"}), 200
