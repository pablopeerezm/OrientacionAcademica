from flask_pymongo import ObjectId

def create_user_model(role, email, password, citas=[]):
    return {
        "role": role,
        "email": email,
        "password": password,  # Hasheada con bcrypt
        "citas": citas,  # Lista de citas, si aplica
    }

def create_cita_model(alumno_id, orientador_id, fecha, hora):
    return {
        "alumno_id": ObjectId(alumno_id),
        "orientador_id": ObjectId(orientador_id),
        "fecha": fecha,
        "hora": hora,
    }
