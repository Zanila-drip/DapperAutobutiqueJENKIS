import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, IconButton } from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { getProducts, deleteProduct } from '../../services/api';
import ProductForm from './ProductForm';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} onClick={() => {
        setCurrentProduct(null);
        setIsFormOpen(true);
      }}>
        Añadir Producto
      </Button>
      
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Precio</Th>
            <Th>Stock</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>${product.price}</Td>
              <Td>{product.stock}</Td>
              <Td>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => {
                    setCurrentProduct(product);
                    setIsFormOpen(true);
                  }}
                  mr={2}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => handleDelete(product.id)}
                  colorScheme="red"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <ProductForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        product={currentProduct}
        onSuccess={fetchProducts}
      />
    </>
  );
}