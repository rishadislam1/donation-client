import { apiSlice } from "../api/apiSlice";

export const mailerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendEmail: builder.mutation({
      query: (data) => ({
        url: "/sendEmail",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useSendEmailMutation} = mailerApi;