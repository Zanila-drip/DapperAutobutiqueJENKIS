// src/components/admin/AdminCategories.jsx
import { Table, Thead, Tbody, Tr, Th, Td, Button, Input, HStack } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

export default function AdminCategories() {
  // Aquí implementarías la lógica para categorías
  return (
    <>
      <HStack mb={4}>
        <Input placeholder="Nombre de categoría" />
        <Button leftIcon={<AddIcon />}>Añadir</Button>
      </HStack>
      
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* Ejemplo estático - reemplazar con datos reales */}
          <Tr>
            <Td>Audio</Td>
            <Td>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                size="sm"
              >
                Eliminar
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}