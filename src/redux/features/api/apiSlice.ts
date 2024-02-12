import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthState {
  accessToken: string | undefined;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://donation-server-1fyj-3ajj7z3tg-freelancerrishad.vercel.app",
    // baseUrl: "http://localhost:5000",
    prepareHeaders: async (headers, {getState})=>{
        const token = (getState() as {auth: AuthState})?.auth?.accessToken;
        if(token){
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
  }),
  tagTypes: ['category','categoryDetails','donation','volunteer','volunteerRequest'],
  endpoints: (builder)=>({})
});
