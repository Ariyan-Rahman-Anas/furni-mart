import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_DOMAIN}/api/banners`,
    credentials: "include",
  }),
  tagTypes: ["banner"],
  endpoints: (builder) => ({
    createBanner: builder.mutation({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["banner"],
    }),
    allBanner: builder.query({
      query: () => "/list",
      providesTags: ["banner"],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const { useCreateBannerMutation, useAllBannerQuery, useDeleteBannerMutation } =
  bannerApi;