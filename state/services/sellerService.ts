import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sellerService = createApi({
    reducerPath: "sellerService",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/buyer_product" }),
    endpoints: (builder) => ({
       
    })
})


export const {
   
} = sellerService