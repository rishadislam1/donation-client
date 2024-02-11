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
      query: ({userEmail,clientEmail}) => ({
        url: `acceptstatus/${userEmail}/${clientEmail}`,
        method: "PATCH",
      }),
      invalidatesTags: ['donation']
    }),
  }),
});

export const {
  useDonationPayMutation,
  useGetDonationQuery,
  useGetAllDonationQuery,
  useAcceptDonationMutation
} = payDonationApi;
