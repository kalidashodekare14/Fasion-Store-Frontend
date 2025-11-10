"use client";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaCartArrowDown } from "react-icons/fa";
import { useCart } from "react-use-cart";

const Navbar = () => {
    const [isToggle, setIsToggle] = useState<boolean>(false);
    const handleToggle = () => setIsToggle((prev) => !prev);
    const {
        totalUniqueItems
    } = useCart();

    const navigation = [
        { id: 1, name: "Home", path: "/" },
        { id: 2, name: "Shop", path: "/shop" },
        { id: 3, name: "About", path: "/about" },
        { id: 4, name: "Service", path: "/service" },
    ];

    return (
        <Box
            as="nav"
            w="100%"
            bg="white"
            boxShadow="sm"
            position="relative"
            zIndex={100}
        >
            {/* Navbar Top Row */}
            <Flex
                justify="space-between"
                align="center"
                px={{ base: 4, lg: 20 }}
                py={3}
            >
                {/* Brand */}
                <Box fontWeight="bold" fontSize="xl">
                    Fashion Design
                </Box>

                {/* Desktop */}
                <Flex
                    display={{ base: "none", lg: "flex" }}
                    alignItems="center"
                    listStyleType="none"
                    gap={6}
                >
                    {navigation.map((navi) => (
                        <Link key={navi.id} href={navi.path}>
                            {navi.name}
                        </Link>
                    ))}
                </Flex>
                <Flex justifyContent="center" alignItems="center" gap={5}>
                    <Link href={"/checkout"}>
                        <Box cursor={"pointer"} position={"relative"}>
                            <FaCartArrowDown size={25} />
                            <Text
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                position={"absolute"}
                                top={"-10px"}
                                right={"-15px"}
                                bg={"#bbbb"}
                                w={5}
                                h={5}
                                rounded={"full"}>{totalUniqueItems}</Text>
                        </Box>
                    </Link>
                    <Button colorScheme="teal">Login</Button>
                </Flex>
                {/* Mobile toggle button */}
                <IconButton
                    aria-label="Toggle Menu"
                    display={{ base: "flex", lg: "none" }}
                    onClick={handleToggle}
                    variant="ghost"
                    fontSize="20px"
                >
                    {
                        isToggle ? <CloseIcon /> : <HamburgerIcon />
                    }
                </IconButton>

            </Flex>

            {/* Mobile */}
            <Box
                display={{ base: isToggle ? "block" : "none", lg: "none" }}
                bg="gray.100"
                py={4}
                px={6}
                position="absolute"
                top="60px"
                left={0}
                w="full"
                transition="all 0.3s ease-in-out"
            >
                {navigation.map((navi) => (
                    <Box key={navi.id} py={2}>
                        <Link href={navi.path}>{navi.name}</Link>
                    </Box>
                ))}
                <Button mt={3} colorScheme="teal" w="full">
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default Navbar;
