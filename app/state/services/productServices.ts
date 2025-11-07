import { IProduct } from "@/app/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/buyer_product" }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<{ success: boolean; message: string; data: IProduct[] }, void>({
            query: () => "/products",
        }),
        getDetailsProduct: builder.query<IProduct, string>({
            query: (id) => `/products/${id}`
        }),
    })
})


export const {
    useGetAllProductsQuery,
    useGetDetailsProductQuery
} = productApi