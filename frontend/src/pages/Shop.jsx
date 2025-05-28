// pages/Shop.jsx
import { useEffect, useState } from 'react';
import { SimpleGrid, Heading } from '@chakra-ui/react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Heading as="h1" p={4}>Nuestros Productos</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={10} p={4}>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={() => setIsCartOpen(true)} 
          />
        ))}
      </SimpleGrid>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}