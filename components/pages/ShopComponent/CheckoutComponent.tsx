"use client"
import { Box, Button, Image, Table, Text } from "@chakra-ui/react"
import { useCart } from "react-use-cart";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const CheckoutComponent = () => {
    const {
        isEmpty,
        items,
        cartTotal,
        emptyCart
    } = useCart();

    const [loading, setLoading] = useState(false);

    const handleOrderNow = async () => {
        if (isEmpty) return;

        setLoading(true);

        const orderData = {
            buyer_email: "buyer4578@example.com",
            seller_email: "seller1254@example.com",
            total_quantity: items.reduce((acc, item) => acc + (item.quantity ?? 0), 0),
            items: items.map(item => ({
                product_id: item.id,
                product_title: item.title,
                product_category: item.category,
                price: item.price,
                quantity: item.quantity ?? 1
            })),
            total_price: items.reduce((acc, item) => acc + (item.price * (item.quantity ?? 0)), 0),
            payment_method: "Cash on Delivery",
            payment_status: "Pending",
            status: "Pending",
            address: "N/A",
            phone: "1234567890"
        };

        console.log("checking data", orderData);

        try {
            const res = await axios.post("http://localhost:5000/api/v1/buyer_product/order", orderData);

            if (res.status === 200) {
                toast.success("Order placed successfully.")
                emptyCart()
            } else {
                toast.error("Order failed.")

            }
        } catch (err) {
            toast.error("Order failed.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Table.Root size="sm">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader fontSize={20}>Image</Table.ColumnHeader>
                        <Table.ColumnHeader fontSize={20}>Product</Table.ColumnHeader>
                        <Table.ColumnHeader fontSize={20}>Category</Table.ColumnHeader>
                        <Table.ColumnHeader fontSize={20} textAlign="end">Price</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>
                                <Image w={"60px"} h={"60px"} rounded={"full"} src={item.image} />
                            </Table.Cell>
                            <Table.Cell>{item.title}</Table.Cell>
                            <Table.Cell>{item.category}</Table.Cell>
                            <Table.Cell textAlign="end">{item.price} TK</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            {!isEmpty && (
                <Box display="flex" flexDirection="column" w={32} alignItems="right" my={5} gap={2}>
                    <Text>Total Price: {cartTotal} TK</Text>
                    <Button colorScheme="teal" onClick={handleOrderNow}>
                        Order Now
                    </Button>
                </Box>
            )}
            <Toaster />
        </div>
    );
};

export default CheckoutComponent;
