import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApi = createApi({
    reducerPath: "wishlistApi",
    baseQuery: fetchBaseQuery({
        baseUrl:`${import.meta.env.VITE_DOMAIN}/api/wishlist`
    }),
    tagTypes:["wishlist"],
    endpoints: builder=> ({
        addToWishlist: builder.mutation({
            query: (item) => ({
                url: "/add",
                method: "POST",
                body:item
            }),
            invalidatesTags:["wishlist"]
        }),
        anUserWishlist:builder.query({
            query:(id)=>`/${id}`,
            providesTags:["wishlist"]
        }),
        removeFromWishlist: builder.mutation({
            query: (ids) => ({
                url: "/delete",
                method: "DELETE",
                body:ids
            }),
            invalidatesTags:["wishlist"]
        })
    })
})

export const {
    useAddToWishlistMutation,
    useAnUserWishlistQuery,
    useRemoveFromWishlistMutation
} = wishlistApi