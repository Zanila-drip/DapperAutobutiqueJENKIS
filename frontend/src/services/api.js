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
export const loginUser = async (data) => {
    try {
        const response = await api.post('/auth/login/', {
            email: data.email,
            password: data.password
        });
        return {
            data: {
                access: response.data.access,
                refresh: response.data.refresh
            }
        };
    } catch (error) {
        console.error("Error completo:", error.response?.data);
        throw error;
    }
};
// Funciones de productos
export const getProducts = () => api.get('/products/');
export const getProduct = (id) => api.get(`/products/${id}/`);
export const createProduct = (productData) => api.post('/products/', productData);
export const updateProduct = (id, productData) => api.put(`/products/${id}/`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}/`);

// Funciones de categorías
export const getCategories = () => api.get('/categories/');
export const createCategory = (categoryData) => api.post('/categories/', categoryData);
export const deleteCategory = (id) => api.delete(`/categories/${id}/`);

// Funciones de usuarios
export const getUsers = () => api.get('/users/');
export const deleteUser = (id) => api.delete(`/users/${id}/`);

// Funciones de órdenes
export const getOrders = () => api.get('/orders/');
export const createOrder = (orderData) => api.post('/orders/', orderData);