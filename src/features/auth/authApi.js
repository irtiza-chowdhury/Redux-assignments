import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    logIn: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLogInMutation, useRegistrationMutation } = authApi;
