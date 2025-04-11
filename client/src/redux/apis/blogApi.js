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
                body:formData
            }),
            invalidatesTags:["blogs"]
        }),
        readBlogs: builder.query({
            query: () => "/list",
            providesTags:["blogs"]
        })
    })
})

export const {
    usePostBlogMutation,
    useReadBlogsQuery
} = blogApi