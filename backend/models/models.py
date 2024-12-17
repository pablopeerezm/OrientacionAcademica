from flask_pymongo import ObjectId

def create_user_model(role, email, password, citas=[]):
    return {
        "role": role,
        "email": email,
        "password": password,
        "citas": citas,
    }

def create_cita_model(alumno_email, orientador_email, fecha, hora):
    return {
        "alumno_email": alumno_email,
        "orientador_email": orientador_email,
        "fecha": fecha,
        "hora": hora,
    }
