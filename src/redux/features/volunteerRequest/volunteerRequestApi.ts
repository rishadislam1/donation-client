import { apiSlice } from "../api/apiSlice";

export const volunteerRequestApi = apiSlice.injectEndpoints({
    endpoints: builder=>({
        addVolunteerRequest: builder.mutation({
            query: (data)=>({
                url: '/addvolunteerrequest',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['volunteerRequest']
        }),

        getVolunteerRequest: builder.query({
            query: ()=> '/getvolunteerrequestdata',
            providesTags: ['volunteerRequest']
        }),
        acceptVolunteerRequest: builder.mutation({
            query: ({userEmail,id, data}) => ({
              url: `acceptvolunteer/${userEmail}/${id}`,
              method: "PATCH",
              body: data
            }),
            invalidatesTags: ['volunteerRequest']
          }),
          rejectVolunteerRequest: builder.mutation({
              query: ({userEmail,id}) => ({
                url: `rejectvolunteer/${userEmail}/${id}`,
                method: "PATCH",
              }),
              invalidatesTags: ['volunteerRequest']
            }),
            getOneVolunteerRequest: builder.query({
                query: (email)=>`/onevolunteerrequest/${email}`
            })
          
    })
});

export const {useAddVolunteerRequestMutation,useGetVolunteerRequestQuery , useAcceptVolunteerRequestMutation, useRejectVolunteerRequestMutation, useGetOneVolunteerRequestQuery} = volunteerRequestApi;