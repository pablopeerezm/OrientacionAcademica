# Orientación Uneat

## Descripción

**Orientación Uneat** es un sistema diseñado para gestionar citas académicas entre alumnos y orientadores. La aplicación integra un sistema seguro de autenticación y protección de rutas para garantizar la privacidad de los datos de los usuarios.

---

## Tecnologías Usadas

### Backend:
- **Python** con **Flask**: API RESTful escalable y eficiente.
- **MongoDB**: Base de datos NoSQL para almacenar información de usuarios, citas y más.
- **JWT**: Autenticación segura basada en tokens.
- **npm**: Gestión de dependencias.

### Frontend:
- **React** con **TypeScript**: Desarrollo moderno y tipado.
- **Material UI**: Diseño atractivo.
- **Axios**: Consumo de APIs de manera sencilla y efectiva.
- **React Router**: Gestión dinámica de rutas en la aplicación.

---

## Características Principales

- **Gestión de Usuarios**:
  - Login de usuarios (alumnos, orientadores y admin).
  - Registro de usuarios (alumnos).
  - Roles definidos para control de permisos.
- **Autenticación Segura**:
  - Login con **JWT Token**.
  - Rutas protegidas para garantizar acceso autorizado.
- **Gestión de Citas Académicas**:
  - Creación, visualización, edición y borrado de citas entre alumnos y orientadores.
- **Gestión de Orientadores**:
  - Creación y borrado de orientadores por parte de admin.


---

## Instalación y Ejecución

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Requisitos Previos
- **Node.js** instalado.
- **Python 3.9+** instalado.
- **MongoDB** en local o en una instancia en la nube.
- **Yarn** como gestor de dependencias.

### Clonar el Repositorio y backend
Clona el repositorio de GitHub en tu máquina local y levanta el backend:

```bash
git clone [URL_DEL_REPOSITORIO]
cd OrientacionAcademica
cd backend
npm install
pyhton app.py
```
Debería salir esto:

![image](https://github.com/user-attachments/assets/5c00b396-75e2-429e-bebc-87d921b8b90d)

### Frontend
Levanta el frontend: Abre una nueva termianl en ruta/OrientacionAcademica
```bash
cd frontend
yarn
yarn start
```
Debería salir esto: 

![image](https://github.com/user-attachments/assets/944f68f9-44a2-48a4-bfc4-9d39146f96f8)

### Backend y frontend levantado
Si aparece eso en tu pantalla habrás levantado el backend en localhost:5000 y frontend en localhost:3000



