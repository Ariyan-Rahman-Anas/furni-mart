import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponApi = createApi({
    reducerPath: "couponApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_DOMAIN}/api/coupons`,
    }),
    tagTypes: ["coupon"],
    endpoints: builder => ({
        createCoupon: builder.mutation({
            query: (formData) => ({
                url: "/create",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["coupon"]
        }),
        allCoupons: builder.query({
            query: () => "/list",
            providesTags: ["coupon"]
        }),
        deleteACoupon: builder.mutation({
            query: couponId => ({
                url: `/${couponId}`,
                method: "DELETE",
                body: couponId
            }),
            invalidatesTags: ["coupon"]
        })
    })
});

export const {
    useCreateCouponMutation,
    useAllCouponsQuery,
    useDeleteACouponMutation
} = couponApi