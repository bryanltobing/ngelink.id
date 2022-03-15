import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RegisterPayload } from "./auth.types";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
  endpoints: (builder) => ({
    register: builder.mutation<string, RegisterPayload>({
      query: (payload) => ({
        url: "/register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;

export const authApiReducer = { [authApi.reducerPath]: authApi.reducer };

export const authApiMiddleware = authApi.middleware;
