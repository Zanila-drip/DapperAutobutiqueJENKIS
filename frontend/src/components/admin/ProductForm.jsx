import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, NumberInput, NumberInputField, Select, Button, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { createProduct, updateProduct } from '../../services/api';

export default function ProductForm({ isOpen, onClose, product, onSuccess }) {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: product?.name || '',
      price: product?.price || 0,
      stock: product?.stock || 0,
      category: product?.category?.id || '',
      description: product?.description || '',
      image: null
    },
    onSubmit: async (values) => {
      try {
        if (product) {
          await updateProduct(product.id, values);
          toast({ title: 'Producto actualizado', status: 'success' });
        } else {
          await createProduct(values);
          toast({ title: 'Producto creado', status: 'success' });
        }
        onSuccess();
        onClose();
      } catch (error) {
        toast({ title: 'Error', description: error.message, status: 'error' });
      }
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{product ? 'Editar Producto' : 'Nuevo Producto'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Nombre</FormLabel>
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </FormControl>
            
            <FormControl mb={4}>
              <FormLabel>Precio</FormLabel>
              <NumberInput precision={2}>
                <NumberInputField
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
              </NumberInput>
            </FormControl>
            
            <Button type="submit" colorScheme="blue" mr={3}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}