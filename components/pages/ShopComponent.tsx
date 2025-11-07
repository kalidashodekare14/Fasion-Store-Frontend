"use client"
import { useGetAllProductsQuery } from "@/app/state/services/productServices";
import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";


const ShopComponent = () => {

    const { data: products, isLoading, error } = useGetAllProductsQuery()
    console.log('checking data', products?.data[0].image[0])

    return (

        <Box>
            <Box display={'grid'} gridTemplateColumns="repeat(4, minmax(0, 1fr))" gap={3} >
                {
                    products?.data?.map(product => (
                        <Flex key={product._id} direction="column" justifyItems={"center"} alignItems={"center"} gap={3} padding={3} border="1px solid" borderColor="gray.300">
                            <img className="w-52" src={product.image?.[0]} alt="" />
                            <Box w={"100%"} spaceY={3}>
                                <Text textStyle={"md"} fontWeight={"bold"}>{product?.title}</Text>
                                <Flex justifyContent={"space-between"} w={"100%"}>
                                    <Box>{product?.category}</Box>
                                    <Box>${product?.price}</Box>
                                </Flex>
                                <Button w={"100%"}>Details</Button>
                            </Box>
                        </Flex>
                    ))
                }
            </Box>
        </Box>
    );
};

export default ShopComponent;