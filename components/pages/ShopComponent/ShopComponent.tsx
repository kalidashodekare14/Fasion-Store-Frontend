"use client"
import { useGetAllProductsQuery } from "@/state/services/productServices";
import { Box, Button, Flex, Grid, Slider, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import Select from 'react-select';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';


interface IFilterData {
    title: string;
    category: string
}


const ShopComponent = () => {

    const [isfilterData, setIsFilterData] = useState<IFilterData>({
        title: "",
        category: "",
    });
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

    const queryParams = {
        ...Object.fromEntries(Object.entries(isfilterData).filter(([_, v]) => v)),
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
    };

    // Data Fetched
    const { data: products, isLoading, error } = useGetAllProductsQuery(queryParams);
    // Filter Data
    const { data: filterData, isLoading: filterLoading, error: filterError } = useGetAllProductsQuery();

    // react select filter data
    const uniqueName = Array.from(
        new Set(filterData?.data.map((data) => data.title))
    )
    const uniqueCategory = Array.from(
        new Set(filterData?.data.map((data) => data.category))
    )

    const nameOptions = uniqueName.map((name) => ({
        value: name,
        label: name
    }))
    const nameCategory = uniqueCategory.map((category) => ({
        value: category,
        label: category
    }))


    return (

        <Box>
            <Box lg={{ display: "flex", alignItems: "center", gap: "5px" }} my={5}>
                <Box lg={{ display: "flex", alignItems: "center", gap: "5px", w: "full"}}>
                    <Select
                        placeholder={"Title"}
                        className="w-full"
                        isClearable={true}
                        options={nameOptions}
                        onChange={(selected) =>
                            setIsFilterData((prev) => ({
                                ...prev,
                                title: selected ? selected.value : ""
                            }))
                        }
                    >
                    </Select>
                    <Select
                        placeholder={"Category"}
                        className="w-full"
                        isClearable={true}
                        options={nameCategory}
                        onChange={(selected) =>
                            setIsFilterData((prev) => ({
                                ...prev,
                                category: selected ? selected.value : ""
                            }))
                        }
                    >
                    </Select>
                </Box>
                <Flex justifyContent="center" alignItems="center" border="1px solid" borderColor={"#bbbb"} w="full" p={4} direction="column" gap={3}>
                    <Flex justifyContent="space-between" w="full">
                        <Text>Min: ${priceRange[0]}</Text>
                        <Text>Max: ${priceRange[1]}</Text>
                    </Flex>
                    <RangeSlider
                        min={0}
                        max={5000}
                        step={10}
                        defaultValue={priceRange}
                        onInput={(val: [number, number]) => setPriceRange(val)}
                    />
                </Flex>
            </Box>
            <Box display={'grid'} lg={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }} gap={3} >
                {
                    products?.data?.map(product => (
                        <Flex key={product._id} w={"100%"} direction="column" justifyItems={"center"} alignItems={"center"} gap={3} padding={3} border="1px solid" borderColor="gray.300" >
                            <img className="w-52" src={product.image?.[0]} alt="" />
                            <Box w={"100%"} spaceY={3}>
                                <Text textStyle={"md"} fontWeight={"bold"}>{product?.title}</Text>
                                <Flex justifyContent={"space-between"} w={"100%"}>
                                    <Box>{product?.category}</Box>
                                    <Box>${product?.price}</Box>
                                </Flex>
                                <Link href={`/shop/${product._id}`}>
                                    <Button w={"100%"}>Details</Button>
                                </Link>
                            </Box>
                        </Flex>
                    ))
                }
            </Box>
        </Box>
    );
};

export default ShopComponent;