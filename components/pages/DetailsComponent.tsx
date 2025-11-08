"use client"
import { useParams } from 'next/navigation';
import { useGetDetailsProductQuery } from '@/app/state/services/productServices';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const DetailsComponent = () => {

    const { id } = useParams()
    const { data: detailsProduct, isLoading, error } = useGetDetailsProductQuery(id as string)
    console.log('checking data', detailsProduct);


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
                    
                </Box>
            </Flex>
        </Box>
    );
};

export default DetailsComponent;