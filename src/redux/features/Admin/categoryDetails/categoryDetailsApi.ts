import { apiSlice } from "../../api/apiSlice";

export const categoryDetailsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCategoryDetails: builder.mutation({
      query: ({email,data}) => ({
        url: `categoryDetails/${email}`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ['categoryDetails']
    }),
    getCategoryDetails: builder.query({
        query: ()=> `/getcategorydetails`,
        providesTags: ['categoryDetails']
    }),
    deleteCategoryDetails: builder.mutation({
        query: ({ email, id }) => ({
          url: `/deletecategorydetails/${email}/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["categoryDetails"],
      }),
  }),
});

export const {
 useAddCategoryDetailsMutation,
 useGetCategoryDetailsQuery,
 useDeleteCategoryDetailsMutation
} = categoryDetailsApi;
