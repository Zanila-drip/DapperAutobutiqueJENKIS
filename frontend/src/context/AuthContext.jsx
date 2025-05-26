import { createContext, useState, useEffect, useContext } from 'react';
import { loginUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Aquí podrías hacer una petición para verificar el token
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const response = await loginUser(credentials);
        localStorage.setItem('token', response.data.access);
        setUser({ token: response.data.access });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Al final del archivo añade:
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
}