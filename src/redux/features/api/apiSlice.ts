import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthState {
  accessToken: string | undefined;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://donation-server-1fyj.vercel.app",
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
