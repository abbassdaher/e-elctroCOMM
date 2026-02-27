import type { Iuser } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const signUpInSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),

  endpoints: (build) => ({
    signUp: build.mutation<Iuser, Iuser>({
      query: (user) => ({
        url: `/auth/local/register`,
        method: "POST",
        body: user,
      }),
    }),
    login: build.mutation<Iuser, Iuser>({
      query: (user) => ({
        url: `/auth/local`,
        method: "POST",
        body: user,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSignUpMutation, useLoginMutation } = signUpInSlice;
