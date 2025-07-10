import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (build) => ({
    getBooks: build.query({
      query: ({ limit, page }) => `/books?limit=${limit}&page=${page}`,
    }),
  }),
});

export const { useGetBooksQuery } = baseApi;
