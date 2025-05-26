import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { getProducts } from '../services/api';

export default function AdminPanel() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nombre</Th>
                    <Th>Precio</Th>
                    <Th>Acciones</Th>
                </Tr>
            </Thead>
            <Tbody>
                {products.map((product) => (
                    <Tr key={product.id}>
                        <Td>{product.name}</Td>
                        <Td>${product.price}</Td>
                        <Td>
                            <Button>Editar</Button>
                            <Button ml={2}>Eliminar</Button>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}