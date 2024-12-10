import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_DOMAIN}/api/coupons`,
    credentials: "include",
  }),
  tagTypes: ["coupon"],
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["coupon"],
    }),
    applyCouponForDiscount: builder.mutation({
      query: (code) => ({
        url: "/apply",
        method: "POST",
        body: code,
      }),
      invalidatesTags: ["coupon"],
    }),
    getSingleCoupon: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["coupon"],
    }),
    allCoupons: builder.query({
      query: () => "/list",
      providesTags: ["coupon"],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["coupon"],
    }),
    deleteACoupon: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useApplyCouponForDiscountMutation,
  useGetSingleCouponQuery,
  useAllCouponsQuery,
  useUpdateCouponMutation,
  useDeleteACouponMutation,
} = couponApi;