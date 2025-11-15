import { IProduct } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sellerService = createApi({
    reducerPath: "sellerService",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/seller_product" }),
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (productData) => ({
                url: "/add_product",
                method: "POST",
                body: productData
            })
        }),
        editProduct: builder.mutation({
            query: ({ id, productData }) => ({
                url: `/edit_product/${id}`,
                method: "PATCH",
                body: productData
            })
        })
        ,
        getProducts: builder.query<{
            success: boolean;
            message: string;
            data: IProduct[];
        }, any>({
            query: (email) => ({
                url: `/total_product/${email}`,
                method: "GET",
            })
        }),
        getOneProduct: builder.query({
            query: (id) => ({
                url: `/one_product/${id}`,
                method: "GET",
            })
        }),
    })
})


export const {
    useAddProductMutation,
    useEditProductMutation,
    useGetProductsQuery,
    useGetOneProductQuery
} = sellerService