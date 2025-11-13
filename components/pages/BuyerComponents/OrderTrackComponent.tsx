"use client"
import { Box, Input, Table, Text } from "@chakra-ui/react";

const items = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
    { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
    { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
    { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
]
const OrderTrackComponent = () => {

    return (
        <Box  height={"100vh"} spaceY={5}>
            <Box
                display={{ base: "block", lg: "flex" }}
                alignContent={{ lg: "space-between" }}
                alignItems={{ lg: "center" }}
                backgroundColor={"#f2f4f5"}
                px={2}
            >
                <Text w={"full"} fontSize={18} my={5}>Order Track</Text>
                <Input w={{lg: "30%"}} type="text" placeholder="Search..." />
            </Box>
            <Table.Root size="sm">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader fontWeight={"bold"}>Product</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight={"bold"}>Category</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight={"bold"} textAlign="end">Price</Table.ColumnHeader>
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

export default OrderTrackComponent;