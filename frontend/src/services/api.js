// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// Interceptor para agregar el token JWT a cada petición
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const registerUser = (data) => api.post('/auth/register/', {
    username: data.username,
    email: data.email,
    password: data.password,
    phone: data.phone,
    address: data.address
});

export const loginUser = (data) => api.post('/auth/login/', {
    email: data.email,  // Nombre exacto del campo esperado por el backend
    password: data.password
}, {
    headers: {
        'Content-Type': 'application/json'
    }
});
export const getProducts = () => api.get('/products/');
export const createOrder = (data) => api.post('/orders/', data);
export const getOrders = () => api.get('/orders/history/');