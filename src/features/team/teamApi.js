import { apislice } from '../api/ApiSlice';

export const teamApi = apislice.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query({
      query: () => '/team',
    }),
  }),
});

export const { useGetTeamQuery } = teamApi;
