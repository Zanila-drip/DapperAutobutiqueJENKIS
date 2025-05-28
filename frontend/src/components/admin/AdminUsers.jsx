// src/components/admin/AdminUsers.jsx
import { Table, Thead, Tbody, Tr, Th, Td, Button, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export default function AdminUsers() {
  // Aquí implementarías la lógica para listar/eliminar usuarios
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Email</Th>
          <Th>Tipo</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {/* Ejemplo estático - reemplazar con datos reales */}
        <Tr>
          <Td>usuario@ejemplo.com</Td>
          <Td>customer</Td>
          <Td>
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              aria-label="Eliminar usuario"
            />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}