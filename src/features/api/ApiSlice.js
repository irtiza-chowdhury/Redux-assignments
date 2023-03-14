import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
  }),
  tagTypes: ['Books', 'Book'],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => '/books',
      keepUnusedDataFor: 600,
      providesTags: ['Books'],
    }),
    getEditedBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (arg) => [{ type: 'Book', id: arg.id }],
    }),
    addNewBook: builder.mutation({
      query: (data) => ({
        url: '/books',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Books'],
    }),
    editExistingBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (arg) => [
        'Books',
        {
          type: 'Book',
          id: arg.id,
        },
      ],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetEditedBookQuery,
  useAddNewBookMutation,
  useEditExistingBookMutation,
  useDeleteBookMutation,
} = ApiSlice;
