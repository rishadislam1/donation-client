import { apiSlice } from "../../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        addCategory: builder.mutation({
            query: ({data,email})=>({
                url: `/addcategory/${email}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['category']
        }),
        getCategory: builder.query({
            query: (email)=>`/getcategory/${email}`,
            providesTags: ['category']
        })
    })
});

export const {useAddCategoryMutation, useGetCategoryQuery} = categoryApi;