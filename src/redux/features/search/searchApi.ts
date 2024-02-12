import { apiSlice } from "../api/apiSlice";

export const searchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query({
      query: (key) => `/search/${key}`,
    }),
  }),
});

export const {useSearchQuery} = searchApi;
