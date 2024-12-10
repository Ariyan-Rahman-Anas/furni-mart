import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_DOMAIN}/api/reviews`,
    credentials: "include",
  }),
  tagTypes: ["review"],
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["review"],
    }),
    aProductReviews: builder.query({
      query: (productId) => `/${productId}`,
      providesTags: ["review"],
    }),
    allReview: builder.query({
      query: () => "/list",
      providesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useAProductReviewsQuery,
  useAllReviewQuery,
  useDeleteReviewMutation,
} = reviewApi;