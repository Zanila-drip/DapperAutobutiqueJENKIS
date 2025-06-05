// pages/LoginRedirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, Spinner, Text } from '@chakra-ui/react';

export default function LoginRedirect() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirección basada en tipo de usuario
      if (user.userType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/shop');
      }
    } else {
      // Si no hay usuario, volver al inicio
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Box textAlign="center" mt={10}>
      <Spinner size="xl" />
      <Text mt={4}>Redirigiendo a tu panel...</Text>
    </Box>
  );
}