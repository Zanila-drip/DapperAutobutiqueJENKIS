import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userType = payload.user_type || 'customer';  // Valor por defecto
        setUser({
          token,
          userType,
          userId: payload.user_id
        });
        // Redirección automática
        if (window.location.pathname === '/login') {
          userType === 'admin' ? navigate('/admin') : navigate('/shop');
        }
      } catch (error) {
        console.error("Error decodificando token:", error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    localStorage.setItem('token', response.data.access);
    const payload = JSON.parse(atob(response.data.access.split('.')[1]));
    setUser({
      token: response.data.access,
      userType: payload.user_type,
      userId: payload.user_id
    });
    // Redirección según tipo de usuario
    payload.user_type === 'admin' ? navigate('/admin') : navigate('/shop');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Al final del archivo añade:
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};