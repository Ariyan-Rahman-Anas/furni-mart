import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_DOMAIN}/api/payments`,
    }),
    tagTypes: ["payment"],
    endpoints: builder => ({
        payWithSSL: builder.mutation({
            query: (payload) => ({
                url: "/ssl",
                method: "POST",
                body: payload
            })
        })
    })
});
export const { usePayWithSSLMutation } = paymentApi