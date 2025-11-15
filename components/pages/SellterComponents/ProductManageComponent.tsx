"use client"
import { Box, Button, Input, Menu, Portal, Table, Text, } from "@chakra-ui/react"
import { useGetProductsQuery, useProductDeleteMutation } from '@/state/services/sellerService';
import { useSession } from 'next-auth/react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import Link from 'next/link';



const ProductManageComponent = () => {



    const { data: session } = useSession()
    const { data: totalProduct, isLoading, error, refetch } = useGetProductsQuery(session?.user?.email, {
        pollingInterval: 60000,
    });
    const [deleteProduct, { isLoading: deleteLoading, isSuccess, error: errorLoading }] = useProductDeleteMutation();

    const handleDeleteProduct = (id: string) => {
        deleteProduct(id).unwrap();

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
                        <Table.ColumnHeader textAlign="end">Action</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {totalProduct?.data?.map((item) => (
                        <Table.Row key={item._id}>
                            <Table.Cell>{item.title}</Table.Cell>
                            <Table.Cell>{item.category}</Table.Cell>
                            <Table.Cell textAlign="end">{item.price} TK</Table.Cell>
                            <Table.Cell textAlign="end">
                                <Menu.Root>
                                    <Menu.Trigger asChild>
                                        <Button variant="outline" size="sm">
                                            <HiOutlineDotsVertical />
                                        </Button>
                                    </Menu.Trigger>
                                    <Portal>
                                        <Menu.Positioner>
                                            <Menu.Content>
                                                <Menu.Item value="rename">
                                                    <Link style={{ border: "none" }} href={`/product_manage/${item._id}`}>Rename</Link>
                                                </Menu.Item>
                                                <Menu.Item
                                                    value="delete"
                                                    color="fg.error"
                                                    _hover={{ bg: "bg.error", color: "fg.error" }}
                                                    onClick={() => handleDeleteProduct(item._id)}
                                                >
                                                    Delete...
                                                </Menu.Item>
                                            </Menu.Content>
                                        </Menu.Positioner>
                                    </Portal>
                                </Menu.Root>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

        </Box>
    );
};

export default ProductManageComponent;