import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
         baseUrl: `${import.meta.env.VITE_DOMAIN}/api/users`,
        // baseUrl: `${import.meta.env.VITE_DOMAIN}/api/users`,
        credentials:"include"
    }),
    endpoints: builder => ({
        loginUser: builder.mutation({
            query: credentials => ({
                url: "/login",
                method: "POST",
                body:credentials
            })
        }),
        registerUser: builder.mutation({
            query: userData => ({
                url: "/registration",
                method: "POST",
                body:userData
            })
        }),
        logOutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method:"POST",
            })
        })
    })
})

export const {useLoginUserMutation, useRegisterUserMutation, useLogOutUserMutation} = authApi