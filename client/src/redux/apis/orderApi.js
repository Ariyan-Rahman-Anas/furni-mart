import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_DOMAIN}/api/orders`,
    }),
    tagTypes: ["order"],
    endpoints: builder => ({
        allOrders: builder.query({
            query: () => "/list",
            providesTags:["order"]
        }),
        anUserOrders: builder.query({
            query: (email) => ({
                url: "/my-orders",
                params: { email },
            }),
            providesTags: ["order"]
        }),
        pendingOrders: builder.query({
            query: () => "/pending",
            providesTags:["order"]
        })
    })
})

export const {
    useAnUserOrdersQuery,
    useAllOrdersQuery,
    usePendingOrdersQuery
} = orderApi