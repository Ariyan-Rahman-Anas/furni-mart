import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_DOMAIN}/api/payments`,
    credentials: "include",
  }),
  tagTypes: ["payment"],
  endpoints: (builder) => ({
    payWithSSL: builder.mutation({
      query: (payload) => ({
        url: "/ssl",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["payment"],
    }),
  }),
});
export const { usePayWithSSLMutation } = paymentApi