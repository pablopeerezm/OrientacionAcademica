from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from functools import wraps  # Importar wraps

def role_required(role):
    def wrapper(func):
        @wraps(func)  # Esto preserva el nombre de la función original
        def decorated_function(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims['role'] != role:
                return jsonify({"error": "No autorizado"}), 403
            return func(*args, **kwargs)
        return decorated_function
    return wrapper
