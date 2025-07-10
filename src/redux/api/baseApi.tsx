import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  tagTypes: ["books"],
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (build) => ({
    getBooks: build.query({
      query: ({ limit, page }) => `/books?limit=${limit}&page=${page}`,
      providesTags: ["books"],
    }),
    createBook: build.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const { useGetBooksQuery, useCreateBookMutation } = baseApi;
