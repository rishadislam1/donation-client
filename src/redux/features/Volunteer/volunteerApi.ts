import { apiSlice } from "../api/apiSlice";

export const volunteerApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        addVolunteer: builder.mutation({
            query: ({data,email})=>({
                url: `/addvolunteer/${email}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['volunteer']
        }),
        getVolunteer: builder.query({
            query: ()=>'/getvolunteer',
            providesTags: ['volunteer']
        }),
        
    })
})

export const {useAddVolunteerMutation, useGetVolunteerQuery} = volunteerApi;