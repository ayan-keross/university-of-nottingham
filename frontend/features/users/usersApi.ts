// features/users/usersApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getUsers: builder.query<{ id: string; name: string }[], void>({
      query: () => "/users",
    }),
    
  }),
});

export const { useGetUsersQuery } = usersApi;
