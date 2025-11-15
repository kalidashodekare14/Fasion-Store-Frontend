"use client"

import { useAddProductMutation } from "@/state/services/sellerService";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Box, Button, FileUpload, Flex, Image, Input, Text, Textarea } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { HiUpload } from "react-icons/hi"
import Swal from 'sweetalert2'

type Inputs = {
    title: string,
    category: string,
    price: number,
    description: string,
    image: string[]
}


const ProductPostComponent = () => {

    const [AddProduct, { isLoading, isSuccess, error }] = useAddProductMutation();
    const { data: session } = useSession();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            console.log(data)
            const productData = {
                title: data.title,
                category: data.category,
                price: Number(data.price),
                description: data.description,
                image: [""],
                seller_email: session?.user?.email
            }
            await AddProduct(productData);
            if (isSuccess) {
                reset()
                Swal.fire({
                    title: "Your Product Successfully",
                    icon: "success",
                    confirmButtonText: "Go to Product List",
                    cancelButtonText: "Add Another"
                });
                console.log('product successfully');
            }
        } catch (error) {

        } finally {

        }
    }


    return (
        <div>
            <Text fontSize={25} my={5}>Add Product</Text>
            <Flex gap={"30px"}>
                <Box w={"full"} border={"1px solid"} borderColor={"#bbbb"} p={5} rounded={5}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl my={5}>
                            <FormLabel>Title</FormLabel>
                            <Input {...register("title", { required: true })} type='text' />
                            {errors.title && <FormHelperText color={'red'}>Email is required</FormHelperText>}
                        </FormControl>
                        <FormControl my={5}>
                            <FormLabel>Category</FormLabel>
                            <Input  {...register("category", { required: true })} type='text' />
                            {errors.category && <FormHelperText color={'red'}>Category is required</FormHelperText>}
                        </FormControl>
                        <FormControl my={5}>
                            <FormLabel>Price</FormLabel>
                            <Input  {...register("price", { required: true })} type='text' />
                            {errors.price && <FormHelperText color={'red'}>Price is required</FormHelperText>}
                        </FormControl>
                        <FormControl my={5}>
                            <FormLabel>Description</FormLabel>
                            <Textarea  {...register("description", { required: true })} h={32} placeholder='Description' />
                            {errors.description && <FormHelperText color={'red'}>Description is required</FormHelperText>}

                        </FormControl>
                        <Button type="submit" w={32}>Submit</Button>
                    </form>
                </Box>
                <Box w={"50%"} border={"1px solid"} borderColor={"#bbbb"} rounded={5}>
                    <Text p={5} fontSize={"20px"}>Image Upload</Text>
                    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} spaceY={"5px"} border={"2px dotted"} borderColor={"#bbb"} mx={3} p={3}>
                        <Image w={"30%"} src="https://i.ibb.co.com/HpR2tjPR/upload.png" alt="" />

                        <Text>Or</Text>
                        <Box>
                            <FileUpload.Root>
                                <FileUpload.HiddenInput multiple />
                                <FileUpload.Trigger asChild>
                                    <Button variant="outline" size="sm">
                                        <HiUpload /> BROWSE
                                    </Button>
                                </FileUpload.Trigger>
                                <FileUpload.List />
                            </FileUpload.Root>
                        </Box>
                    </Box>
                </Box>
            </Flex>
            <Toaster />
        </div>
    );
};

export default ProductPostComponent;