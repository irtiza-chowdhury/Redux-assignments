import { apislice } from '../api/ApiSlice';

export const projectApi = apislice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => '/projects',
    }),
  }),
});

export const { useGetProjectsQuery } = projectApi;
