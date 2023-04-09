import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    editPassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetAllUsersQuery, useEditPasswordMutation } = userApi;
