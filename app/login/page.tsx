"use client"
import { Box, Button, Input, Spinner, Text } from '@chakra-ui/react';
import { useForm, SubmitHandler } from "react-hook-form"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    FormErrorIcon,
} from "@chakra-ui/form-control"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

type Inputs = {
    email: string
    password: string
}

const LoginPage = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        try {
            const loginData = {
                email: data.email,
                password: data.password,
                redirect: false
            }
            setIsLoading(true);
            const res = await signIn('credentials', loginData)
            if (res?.status === 200) {
                toast.success('Login Successfully 🎉');
                setTimeout(() => {
                    router.push("/");
                }, 1000)
            }
            if (res?.ok === false || res?.status === 401) {
                console.log("Sign In Error")
                toast.error('Login Failed 🎉');
            }
        } catch (error) {
            console.log(error);
            toast.error('Login Failed 🎉');
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
                    <Text fontSize={"25px"}>Log in</Text>
                    <FormControl>
                        {/* <FormLabel>Email address</FormLabel> */}
                        <Input {...register("email", { required: true })} w={"full"} type='email' placeholder='Email' />
                        <FormHelperText color={"red"}>
                            {errors.email && "Email is required"}
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                        {/* <FormLabel>Email address</FormLabel> */}
                        <Input {...register("password", { required: true })} w={"full"} type='password' placeholder='password' />
                        <FormHelperText color={"red"}>
                            {errors.password && "Password is required"}
                        </FormHelperText>
                    </FormControl>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Button type="submit" colorScheme="blue" w="30%">
                            {isLoading ? <Spinner /> : "Log In"}
                        </Button>
                    </Box>
                </Box>
            </form>
            <Toaster />
        </Box>
    );
};

export default LoginPage;