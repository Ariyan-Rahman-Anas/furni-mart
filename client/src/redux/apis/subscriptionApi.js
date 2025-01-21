import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscriptionApi = createApi({
    reducerPath: "subscriptionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_DOMAIN}/api/subscribe`,
    }),
    tagTypes: ["subscription"],
    endpoints: builder => ({
        createSubscription: builder.mutation({
            query: (formData) => ({
                url: '/create',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['subscription']
        }),
        allSubscribers: builder.query({
            query: () => '/list',
            providesTags: ['subscription']
        }),
        singleSubscriber: builder.query({
            query: ({email}) => `/${email}`,
            providesTags: ['subscription']
        })
    })
})

export const {
    useCreateSubscriptionMutation,
    useAllSubscribersQuery,
    useSingleSubscriberQuery
}= subscriptionApi