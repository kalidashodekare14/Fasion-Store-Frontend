"use client"
import { useGetOrderTrackQuery } from "@/state/services/productServices";
import { IOrder } from "@/types/product";
import { Box, Button, Input, Table, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const items = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
    { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
    { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
    { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
]
const OrderTrackComponent = () => {

    const { data: session } = useSession();
    const { data: OrdersData, isLoading, error } = useGetOrderTrackQuery(session?.user?.email);

    return (
        <Box height={"100vh"} spaceY={5}>
            <Box
                display={{ base: "block", lg: "flex" }}
                alignContent={{ lg: "space-between" }}
                alignItems={{ lg: "center" }}
                backgroundColor={"#f2f4f5"}
                px={2}
            >
                <Text w={"full"} fontSize={18} my={5}>Order Track</Text>
                <Input w={{ lg: "30%" }} type="text" placeholder="Search..." />
            </Box>
            <Table.Root size="sm">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader fontWeight={"bold"}>Name</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight={"bold"}>Email</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight={"bold"}>Phone</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight={"bold"}>Items</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight={"bold"} textAlign="end">Total Quantity</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight={"bold"} textAlign="end">Total Price</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight={"bold"} textAlign="end">Payment Method</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight={"bold"} textAlign="end">Payment Status</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight={"bold"} textAlign="end">Status</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {OrdersData?.data.map((item: IOrder) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.buyer_name}</Table.Cell>
                            <Table.Cell>{item.buyer_email}</Table.Cell>
                            <Table.Cell>{item.phone}</Table.Cell>
                            <Table.Cell>
                                <Button>{item?.items.length}</Button>
                            </Table.Cell>
                            <Table.Cell textAlign="end">{item.total_quantity}</Table.Cell>
                            <Table.Cell textAlign="end">{item.total_price} TK</Table.Cell>
                            <Table.Cell textAlign="end">{item.payment_method}</Table.Cell>
                            <Table.Cell textAlign="end">{item.payment_status}</Table.Cell>
                            <Table.Cell textAlign="end">{item.status}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Box>
    );
};

export default OrderTrackComponent;