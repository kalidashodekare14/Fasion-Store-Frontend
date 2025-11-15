"use client"
import React, { useState } from 'react';
import { Box, Button, CloseButton, Dialog, Field, Input, Portal, Table, Text, } from "@chakra-ui/react"
import { SubmitHandler, useForm } from 'react-hook-form';
import { useGetProductsQuery } from '@/state/services/sellerService';
import { useSession } from 'next-auth/react';

const items = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
    { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
    { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
    { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
]



const ProductManageComponent = () => {

    const { data: session } = useSession()
    const { data: totalProduct, isLoading, error } = useGetProductsQuery(session?.user?.email);
    console.log('checking total product', totalProduct);



    return (
        <Box height={"100vh"} spaceY={5}>
            <Box
                display={{ base: "block", lg: "flex" }}
                alignContent={{ lg: "space-between" }}
                alignItems={{ lg: "center" }}
                backgroundColor={"#f2f4f5"}
                px={2}
                py={2}
            >
                <Box w={"full"}>
                    <Text>Products</Text>
                </Box>
                <Input w={{ lg: "30%" }} type="text" placeholder="Search..." />
            </Box>
            {/* Modal Product Add */}

            <Table.Root size="sm">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Product</Table.ColumnHeader>
                        <Table.ColumnHeader>Category</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {totalProduct?.data?.map((item) => (
                        <Table.Row key={item._id}>
                            <Table.Cell>{item.title}</Table.Cell>
                            <Table.Cell>{item.category}</Table.Cell>
                            <Table.Cell textAlign="end">{item.price} TK</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

        </Box>
    );
};

export default ProductManageComponent;