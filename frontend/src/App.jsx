import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/pages" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/admin" element={<AdminPanel />} />
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}