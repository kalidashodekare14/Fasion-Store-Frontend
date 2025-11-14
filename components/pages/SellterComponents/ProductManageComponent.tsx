"use client"
import React, { useState } from 'react';
import { Box, Button, CloseButton, Dialog, Field, Input, Portal, Table, Text, } from "@chakra-ui/react"
import { SubmitHandler, useForm } from 'react-hook-form';

const items = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
    { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
    { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
    { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
]

type Inputs = {

    title: string,
    description: string,
    category: string,
    price: number,
    image: string[],
    // seller_email: string,
    status: string
}

const ProductManageComponent = () => {

    const [isDialog, setIsDialog] = useState(false);


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
    }


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
                    {items.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.category}</Table.Cell>
                            <Table.Cell textAlign="end">{item.price}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

        </Box>
    );
};

export default ProductManageComponent;