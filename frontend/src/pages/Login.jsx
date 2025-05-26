import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, VStack } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({
                email: email,  // Asegúrate que esto coincide con el nombre del campo
                password: password
            });
            localStorage.setItem('token', response.data.access);
            navigate('/');
        } catch (error) {
            console.error("Error de login:", error.response?.data);
            alert("Credenciales incorrectas. Intenta nuevamente.");
        }
    };
    
    return (
        <Box p={4}>
            <VStack spacing={4}>
                <Input
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleSubmit}>Iniciar sesión</Button>
            </VStack>
        </Box>
    );
}