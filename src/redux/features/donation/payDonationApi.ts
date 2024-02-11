import { apiSlice } from "../api/apiSlice";

export const payDonationApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        donationPay: builder.mutation({
            query: (data)=>({
                url: '/paydonation',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['donation']
        }),
        getDonation: builder.query({
            query: (userEmail)=>`getdonation/${userEmail}`,
            providesTags: ['donation']
        })
    })
});

export const {useDonationPayMutation, useGetDonationQuery} = payDonationApi;