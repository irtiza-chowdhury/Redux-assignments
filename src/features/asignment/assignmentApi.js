import { apiSlice } from '../api/apiSlice';

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssignment: builder.query({
      query: () => '/assignments',
      providesTags: ['Assignments'],
    }),

    getSingleAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
      providesTags: (arg) => [{ type: 'SingleAssignment', id: arg.id }],
    }),

    updateSigleAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (arg) => [
        'Assignments',
        {
          type: 'SingleAssignment',
          id: arg.id,
        },
      ],
    }),

    addNewAssignment: builder.mutation({
      query: (data) => ({
        url: '/assignments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Assignments'],
    }),

    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Assignments'],
    }),
  }),
});

export const {
  useAddNewAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAllAssignmentQuery,
  useGetSingleAssignmentQuery,
  useUpdateSigleAssignmentMutation,
} = assignmentApi;
