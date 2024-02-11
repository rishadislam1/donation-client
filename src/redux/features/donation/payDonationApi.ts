import { apiSlice } from "../api/apiSlice";

export const payDonationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    donationPay: builder.mutation({
      query: (data) => ({
        url: "/paydonation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["donation"],
    }),
    getDonation: builder.query({
      query: (userEmail) => `getdonation/${userEmail}`,
      providesTags: ["donation"],
    }),
    getAllDonation: builder.query({
      query: (userEmail) => `getalldonation/${userEmail}`,
      providesTags: ["donation"],
    }),
    acceptDonation: builder.mutation({
      query: ({userEmail,id}) => ({
        url: `acceptstatus/${userEmail}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ['donation']
    }),
    rejectDonation: builder.mutation({
        query: ({userEmail,id}) => ({
          url: `rejectstatus/${userEmail}/${id}`,
          method: "PATCH",
        }),
        invalidatesTags: ['donation']
      }),
      deleteDonation: builder.mutation({
        query: ({userEmail,id}) => ({
          url: `deletedonation/${userEmail}/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ['donation']
      }),
  }),
});

export const {
  useDonationPayMutation,
  useGetDonationQuery,
  useGetAllDonationQuery,
  useAcceptDonationMutation,
  useRejectDonationMutation,
  useDeleteDonationMutation
} = payDonationApi;
