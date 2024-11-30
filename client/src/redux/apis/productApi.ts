import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_DOMAIN}/api/products`
    }),
    tagTypes: ["product"],
    endpoints: builder => ({
        createProduct: builder.mutation({
            query: ({ formData }) => ({
                url: "/create",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["product"]
        }),
        allProducts: builder.query({
            query: () => "/list",
            providesTags: ["product"]
        }),
        singleProduct: builder.query({
            query: (id) => `/${id}`,
            providesTags: ["product"]
        }),
        searchProducts: builder.query({
            query: ({ page, sort, price, category, subCategory, search }) => {
                let baseQuery = `/search?search=${search}&page=${page}`
                if (price) baseQuery += `&price=${price}`
                if (sort) baseQuery += `&sort=${sort}`
                if (category) baseQuery += `&category=${category}`
                if (subCategory) baseQuery += `&subCategory=${subCategory}`
                return baseQuery
            },
            providesTags: ["product"]
        }),
        categories: builder.query({
            query: () => "/categories",
            providesTags: ["product"]
        }),
        subCategories: builder.query({
            query: () => "/sub-categories",
            providesTags: ["product"]
        })
    })
})

export const {
    useCreateProductMutation,
    useAllProductsQuery,
    useSingleProductQuery,
    useSearchProductsQuery,
    useCategoriesQuery,
    useSubCategoriesQuery
} = productApi