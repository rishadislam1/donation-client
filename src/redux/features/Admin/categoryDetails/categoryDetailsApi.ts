import { apiSlice } from "../../api/apiSlice";

export const categoryDetailsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCategoryDetails: builder.mutation({
      query: ({email,data}) => ({
        url: `categoryDetails/${email}`,
        method: "POST",
        body: data
      }),
    }),
  }),
});

export const {
 useAddCategoryDetailsMutation
} = categoryDetailsApi;
