import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, Button, VStack, Text } from '@chakra-ui/react';
import { useCart } from '../context/CartContext';

export default function CartSidebar({ isOpen, onClose }) {
    const { cart, removeFromCart, clearCart } = useCart();

    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>Carrito de compras</DrawerHeader>
                <DrawerBody>
                    <VStack spacing={4}>
                        {cart.map((item) => (
                            <Text key={item.id}>{item.name} - ${item.price}</Text>
                        ))}
                        <Button onClick={clearCart}>Vaciar carrito</Button>
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}