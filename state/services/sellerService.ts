import { IProduct } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sellerService = createApi({
    reducerPath: "sellerService",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/seller_product" }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (productData) => ({
                url: "/add_product",
                method: "POST",
                body: productData
            }),
            invalidatesTags: ['Products'],
        }),
        editProduct: builder.mutation({
            query: ({ id, productData }) => ({
                url: `/edit_product/${id}`,
                method: "PATCH",
                body: productData
            }),
            invalidatesTags: ['Products'],
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
            }),
            providesTags: ['Products'],
        }),
        getOneProduct: builder.query({
            query: (id) => ({
                url: `/one_product/${id}`,
                method: "GET",
            })
        }),
        productDelete: builder.mutation({
            query: (id) => ({
                url: `/delete_product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Products'],
        })
    })
})


export const {
    useAddProductMutation,
    useEditProductMutation,
    useGetProductsQuery,
    useGetOneProductQuery,
    useProductDeleteMutation
} = sellerService