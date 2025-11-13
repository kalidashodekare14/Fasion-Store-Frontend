import { IOrder, IProduct } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetProductParams {
    category?: string;
    title?: string;
    minPrice?: number;
    maxPrice?: number;
}


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/buyer_product" }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<{
            success: boolean;
            message: string;
            data: IProduct[];
        }, GetProductParams | void>({
            query: (params) => ({
                url: "/products",
                method: "GET",
                params: params ?? {}
            }),
        }),
        getDetailsProduct: builder.query<{ success: boolean; message: string; data: IProduct }, string>({
            query: (id) => `/products/${id}`,
        }),
        getOrderTrack: builder.query<{ success: boolean; message: string; data: IOrder }, string | null | undefined>({
            query: (email) => `/order/${email}`,
        })
    })
})


export const {
    useGetAllProductsQuery,
    useGetDetailsProductQuery,
    useGetOrderTrackQuery
} = productApi