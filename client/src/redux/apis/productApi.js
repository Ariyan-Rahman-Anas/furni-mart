import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_DOMAIN}/api/products`,
        credentials:"include"
    }),
    tagTypes: ["product"],
    endpoints: builder => ({
        createProduct: builder.mutation({
            query: (formData ) => ({
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
        categoryCounts: builder.query({
            query: () => "/category-counts",
            providesTags:["product"]
        }),
        subCategories: builder.query({
            query: () => "/sub-categories",
            providesTags: ["product"]
        }),
        subcategoryCounts: builder.query({
            query: () => "/subcategory-counts",
            providesTags:["product"]
        }),
        updateProduct: builder.mutation({
            query: ({productId, formData}) => ({
                url: `/${productId}`,
                method: "PUT",
                body:formData
            }),
            invalidatesTags:["product"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["product"]
        })
    })
})

export const {
    useCreateProductMutation,
    useAllProductsQuery,
    useSingleProductQuery,
    useSearchProductsQuery,
    useCategoriesQuery,
    useCategoryCountsQuery,
    useSubCategoriesQuery,
    useSubcategoryCountsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productApi