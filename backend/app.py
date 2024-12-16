from flask import Flask
from extensions import mongo, jwt
from datetime import timedelta

# Importar rutas
from routes.auth import auth_bp
from routes.citas import citas_bp
from routes.admin import admin_bp

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)
