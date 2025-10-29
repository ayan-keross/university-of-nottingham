// features/auth/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; user: { id: string; name: string } | null }, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getProfile: builder.query<{ id: string; name: string } | null, void>({
      query: () => "/auth/profile",
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
