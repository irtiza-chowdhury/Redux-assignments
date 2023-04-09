import { apiSlice } from '../api/apiSlice';

export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVideos: builder.query({
      query: () => '/videos',
      providesTags: ['Videos'],
    }),
    getSingleVideo: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: (arg) => [{ type: 'SingleVideo', id: arg.id }],
    }),
    addNewVideo: builder.mutation({
      query: (data) => ({
        url: '/videos',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Videos'],
    }),
    editSingleVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (arg) => [
        'Videos',
        {
          type: 'SingleVideo',
          id: arg.id,
        },
      ],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Videos'],
    }),
  }),
});

export const {
  useGetAllVideosQuery,
  useGetSingleVideoQuery,
  useDeleteVideoMutation,
  useAddNewVideoMutation,
  useEditSingleVideoMutation,
} = videoApi;
