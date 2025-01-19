import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_DOMAIN}/api/users`,
        credentials:"include"
    }),
    tagTypes:["user"],
    endpoints: builder => ({
        loginUser: builder.mutation({
            query: credentials => ({
                url: "/login",
                method: "POST",
                body:credentials
            }),
            invalidatesTags:['user']
        }),
        registerUser: builder.mutation({
            query: userData => ({
                url: "/registration",
                method: "POST",
                body:userData
            }),
            invalidatesTags:['user']
        }),
        googleLogin: builder.mutation({
            query: (userData) => ({
                url: "/google-auth",
                method: "POST",
                body: userData
            }),
            invalidatesTags:['user']
        }),
        logOutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method:"POST",
            }),
            invalidatesTags:['user']
        }),
        userList: builder.query({
            query: () => "/list",
            providesTags:["user"]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["user"]
        })
    })
})

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useGoogleLoginMutation,
    useLogOutUserMutation,
    useUserListQuery,
    useDeleteUserMutation
} = authApi