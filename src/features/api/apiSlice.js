/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
    prepareHeaders: async (headers, { getState }) => {
      const token = getState()?.auth?.accessToken;
      const adminToken = getState()?.admin?.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      if (adminToken) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: [
    'Users',
    'Videos',
    'SingleVideo',
    'Assignments',
    'SingleAssignment',
    'Quizzes',
    'SingleQuiz',
    'assignmentMark',
  ],
  endpoints: (builder) => ({}),
});
