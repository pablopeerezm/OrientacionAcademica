from flask import Flask, make_response, request, jsonify
from flask_cors import CORS
from extensions import mongo, jwt
from datetime import timedelta

# Importar rutas
from routes.auth import auth_bp
from routes.citas import citas_bp
from routes.admin import admin_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], methods=["GET", "POST", "PUT", "OPTIONS", "DELETE"])

# Configuración
app.config['MONGO_URI'] = 'mongodb://localhost:27017/autenticacion_db'
app.config['JWT_SECRET_KEY'] = 'secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)  # Cambia 1 por el tiempo que desees

# Inicialización
mongo.init_app(app)
jwt.init_app(app)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(citas_bp, url_prefix='/citas')
app.register_blueprint(admin_bp, url_prefix='/admin')

# Manejo manual de la ruta OPTIONS
@app.before_request
def handle_preflight():
    """Manualmente maneja las solicitudes OPTIONS preflight."""
    if request.method == "OPTIONS":
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response

if __name__ == '__main__':
    app.run(debug=True)
