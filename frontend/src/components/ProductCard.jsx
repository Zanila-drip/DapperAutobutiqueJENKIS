import { Card, CardBody, Image, Stack, Heading, Text, Button } from '@chakra-ui/react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <Card>
            <Image src={product.image} alt={product.name} />
            <CardBody>
                <Heading size="md">{product.name}</Heading>
                <Text>${product.price}</Text>
                <Button onClick={() => addToCart(product)}>Agregar al carrito</Button>
            </CardBody>
        </Card>
    );
}