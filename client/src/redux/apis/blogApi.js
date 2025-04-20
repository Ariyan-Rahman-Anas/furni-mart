import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_DOMAIN}/api/blogs`,
    }),
    tagTypes: ["blogs"],
    endpoints: (builder) => ({
        postBlog: builder.mutation({
            query: formData => ({
                url: "/create",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["blogs"]
        }),
        readBlogs: builder.query({
            query: () => "/list",
            providesTags: ["blogs"]
        }),
        searchBlog: builder.query({
            query: ({search, popular}) => {
                let baseQuery = `/search?search=${search}`
                if (popular) baseQuery += `&popular=${popular}`
                return baseQuery
            },
            providesTags:["blogs"]
        }),
        trackBlogViews: builder.mutation({
            query: (slug) => ({
                url: `${slug}`,
                method:"PATCH"
            }),
            invalidatesTags:["blogs"]
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["blogs"]
        })
    })
})

export const {
    usePostBlogMutation,
    useReadBlogsQuery,
    useSearchBlogQuery,
    useTrackBlogViewsMutation,
    useDeleteBlogMutation
} = blogApi