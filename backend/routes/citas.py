from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from extensions import mongo
from middlewares.auth import role_required
from models.models import create_cita_model
from bson import ObjectId

citas_bp = Blueprint('citas', __name__)
# Función auxiliar
def serialize_cita(cita):
    cita["_id"] = str(cita["_id"])
    return cita
# Read citas
@citas_bp.route('/<string:alumno_email>', methods=['GET'])
@jwt_required()
def get_citas(alumno_email):
    user = mongo.db.users.find_one({"email": alumno_email})
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404
    citas = user.get("citas", [])
    citas =[serialize_cita(cita) for cita in citas]
    return jsonify(citas), 200

# Create cita
@citas_bp.route('/', methods=['POST'])
@jwt_required()
def create_cita():
    data = request.json
    cita = create_cita_model(data['alumno_email'], data['orientador_email'], data['fecha'], data['hora'])
    print("Cita a insertar: ", cita)
    mongo.db.citas.insert_one(cita)
    alumno_update_result = mongo.db.users.update_one(
        {"email": data['alumno_email']},
        {"$push": {"citas": cita}}  
    )
    orientador_update_result = mongo.db.users.update_one(
        {"email": data['orientador_email']},
        {"$push": {"citas": cita}}  
    )
    if alumno_update_result.modified_count == 0:
        return jsonify({"message": "No se encontró el alumno o no se pudo agregar la cita"}), 400
    if orientador_update_result.modified_count == 0:
        return jsonify({"message": "No se encontró el orientador o no se pudo agregar la cita"}), 400
    return jsonify({"message": "Cita creada y asignada a usuario y orientador"}), 201

# Delete cita
@citas_bp.route('/<id>', methods=['DELETE'])
def delete_cita(id):
    try:
        if not ObjectId.is_valid(id):
            return jsonify({"message": "ID de cita no válido"}), 400
        cita = mongo.db.citas.find_one({"_id": ObjectId(id)})
        if not cita:
            return jsonify({"message": "Cita no encontrada"}, 404)                    
        mongo.db.users.update_one(
            {"email": cita["alumno_email"]},
            {"$pull": {"citas": {"_id": ObjectId(id)}}}
        )
        mongo.db.users.update_one(
            {"email": cita["orientador_email"]},
            {"$pull": {"citas": {"_id": ObjectId(id)}}}
        )
        mongo.db.citas.delete_one({"_id": ObjectId(id)})
        return jsonify({"message": "Cita eliminada correctamente"}), 200
    except Exception as e:
                return jsonify({"message": f"Error al eliminar la cita: {str(e)}"}), 500

# Update cita
@citas_bp.route('/<id>', methods=['PUT'])
def update_cita(id):
    try:
        if not ObjectId.is_valid(id):
            return jsonify({"message": "ID de cita no válido"}), 400

        cita = mongo.db.citas.find_one({"_id": ObjectId(id)})
        if not cita:
            return jsonify({"message": "Cita no encontrada"}), 404

        data = request.json
        nuevo_dia = data.get("fecha")
        nueva_hora = data.get("hora")

        if not nuevo_dia or not nueva_hora:
            return jsonify({"message": "Debe proporcionar 'fecha' y 'hora' para actualizar la cita"}), 400

        mongo.db.citas.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"fecha": nuevo_dia, "hora": nueva_hora}}
        )

        mongo.db.users.update_one(
            {"email": cita["alumno_email"], "citas._id": ObjectId(id)},
            {"$set": {"citas.$.fecha": nuevo_dia, "citas.$.hora": nueva_hora}}
        )

        mongo.db.users.update_one(
            {"email": cita["orientador_email"], "citas._id": ObjectId(id)},
            {"$set": {"citas.$.fecha": nuevo_dia, "citas.$.hora": nueva_hora}}
        )

        return jsonify({"message": "Cita actualizada correctamente"}), 200

    except Exception as e:
        print(f"Error al actualizar la cita: {str(e)}")  # Log para depuración
        return jsonify({"message": f"Error al actualizar la cita: {str(e)}"}), 500
