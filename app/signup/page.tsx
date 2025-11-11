"use client"
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { useForm, SubmitHandler } from "react-hook-form"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    FormErrorIcon,
} from "@chakra-ui/form-control"
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { Spinner } from "@chakra-ui/react"
import { useAxiosSecure } from '@/hooks/useAxiosSecure';

type Inputs = {
    name: string,
    email: string
    password: string,
}

const SignUp = () => {

    const axiosSecure = useAxiosSecure();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        const loginData = {
            name: data.name,
            email: data.email,
            password: data.password
        }
        try {
            setIsLoading(true);
            const res = await axiosSecure.post("/api/v1/auth/register", loginData);
            console.log(res);
            if (res.status === 200) {
                toast.success('Register successfully🎉');
            }

        } catch (error) {
            console.log(error);
            toast('Register Failed ❌');
        } finally {
            setIsLoading(false);
        }



    }

    return (
        <Box my={5} mx={5} display={"flex"} justifyContent={"center"} alignItems={"center"} h={"50vh"} lg={{ h: "80vh" }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box
                    w={{ base: "90%", md: "60%", lg: "40%" }}
                    border={"1px solid"}
                    p={5}
                    spaceY={3}
                    borderColor={"#bbbb"}>
                    <Text fontSize={"25px"}>Sign Up</Text>
                    <FormControl>
                        <Input {...register("name", { required: true })} w={"full"} type='text' placeholder='Full Name' />
                        <FormHelperText color={"red"}>
                            {errors.email && "Name is required"}
                        </FormHelperText>
                    </FormControl>
                    <FormControl>

                        <Input {...register("email", { required: true })} w={"full"} type='email' placeholder='Email' />
                        <FormHelperText color={"red"}>
                            {errors.email && "Email is required"}
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input {...register("password", { required: true })} w={"full"} type='password' placeholder='password' />
                        <FormHelperText color={"red"}>
                            {errors.password && "Password is required"}
                        </FormHelperText>
                    </FormControl>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Button type='submit'>
                            {isLoading ? <Spinner /> : "Sign Up"}
                        </Button>
                    </Box>
                </Box>
            </form >
            <Toaster />
        </Box >
    );
};

export default SignUp;