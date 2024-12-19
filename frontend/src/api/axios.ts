import axios, { AxiosInstance } from 'axios';

// Instancia de Axios
const api: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000', 
});

// Agregar el token de autorizacion
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('jwt'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
