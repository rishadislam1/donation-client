import { apiSlice } from "../api/apiSlice";

export const volunteerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVolunteer: builder.mutation({
      query: ({ data, email }) => ({
        url: `/addvolunteer/${email}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["volunteer"],
    }),
    getVolunteer: builder.query({
      query: () => "/getvolunteer",
      providesTags: ["volunteer"],
    }),
    deleteVolunteer: builder.mutation({
      query: ({ email, id }) => ({
        url: `/deletevolunteer/${email}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["volunteer"],
    }),
  }),
});

export const {
  useAddVolunteerMutation,
  useGetVolunteerQuery,
  useDeleteVolunteerMutation,
} = volunteerApi;
