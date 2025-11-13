"use client"
import { useParams } from 'next/navigation';
import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react';
import { useGetDetailsProductQuery } from '@/state/services/productServices';
import { useState } from 'react';
import { useCart } from 'react-use-cart';


interface Item {
    id: string;
    image: string[];
    title: string;
    category: string,
    price: number;
    quantity: number;
    seller_email: string
}

const DetailsComponent = () => {


    const [isQuantity, setIsQuantity] = useState<number>(1);
    const { addItem } = useCart();

    console.log('checking number', isQuantity);

    // params query
    const { id } = useParams()
    // Singel Data Fetched
    const { data: detailsProduct, isLoading, error } = useGetDetailsProductQuery(id as string)
    console.log('checking data', detailsProduct)


    return (
        <Box my={10}>
            <Flex gap={5}>
                <Box border="1px solid" borderColor="gray.300" width={"40%"} rounded={"md"}>
                    <Image width={"100%"} src={detailsProduct?.data?.image?.[0]} alt="" />
                </Box>
                <Box spaceY={3}>
                    <Text textStyle="3xl" fontWeight="bold" >{detailsProduct?.data?.title}</Text>
                    <Text>{detailsProduct?.data?.description}</Text>
                    <Text>Category: {detailsProduct?.data?.category}</Text>
                    <Text>Price: ${detailsProduct?.data?.price}</Text>
                    <Flex gap={2}>
                        <Button onClick={() => setIsQuantity(prev => Math.max(prev - 1, 1))}>-</Button>
                        <Input w={20} value={isQuantity} type='text' readOnly></Input>
                        <Button onClick={() => setIsQuantity(prev => prev + 1)}>+</Button>
                    </Flex>
                    <Button onClick={() => {
                        if (!detailsProduct?.data) return;
                        addItem({
                            id: detailsProduct.data._id,
                            image: detailsProduct.data.image,
                            title: detailsProduct.data.title,
                            category: detailsProduct.data.category,
                            price: detailsProduct.data.price,
                            seller_email: detailsProduct.data.seller_email
                        } as Item, isQuantity)
                    }}>Add to Cart</Button>
                </Box>
            </Flex >
        </Box >
    );
};

export default DetailsComponent;