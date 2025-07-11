import type { IBook } from "@/types";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  tagTypes: ["books", "borrow"],
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (build) => ({
    getBooks: build.query({
      query: ({ limit, page }) => `/books?limit=${limit}&page=${page}`,
      providesTags: ["books"],
    }),
    getSingleBook: build.query<IBook, string>({
      query: (id) => `/books/${id}`,
    }),
    createBook: build.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
    UpdateBook: build.mutation({
      query: ({ id, updatedBook }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: updatedBook,
      }),
      invalidatesTags: ["books"],
    }),
    removeBook: build.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),

    getBorrowBooks: build.query({
      query: () => ({
        url: "/borrow",
      }),
      providesTags: ["borrow"],
    }),
    createBorrowBook: build.mutation({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["books", "borrow"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useRemoveBookMutation,
  useCreateBorrowBookMutation,
  useGetBorrowBooksQuery,
} = baseApi;
