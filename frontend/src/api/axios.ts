import axios, { AxiosInstance } from 'axios';

// Crear una instancia de Axios
const api: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Cambia esta URL si tu backend está en otro host o puerto
  // baseURL: 'http://localhost:5000', // Cambia esta URL si tu backend está en otro host o puerto
//   timeout: 10000, // Tiempo máximo de espera para una solicitud (opcional)
});

// Interceptor para agregar el token de autorización (si existe)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt'); // Obtén el token del almacenamiento local
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agrega el token en los headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
