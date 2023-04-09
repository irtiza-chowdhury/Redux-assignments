/* eslint-disable eqeqeq */
import { apiSlice } from '../api/apiSlice';

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubmitedAssginment: builder.query({
      query: () => '/assignmentMark',
      providesTags: ['assignmentMark'],
    }),
    getEditedAssignment: builder.query({
      query: (id) => `/assignmentMark/${id}`,
    }),

    answerToAssignment: builder.mutation({
      query: (data) => ({
        url: '/assignmentMark',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['assignmentMark'],
    }),

    addMarkToAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: 'PATCH',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedAssignmentMark } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              'getEditedAssignment',
              arg.id.toString(),
              () => updatedAssignmentMark
            )
          );

          dispatch(
            apiSlice.util.updateQueryData('getSubmitedAssginment', undefined, (draft) => {
              // eslint-disable-next-line eqeqeq
              const targetAssignment = draft.find((item) => item.id == arg.id);

              targetAssignment.mark = updatedAssignmentMark.mark;
              targetAssignment.status = updatedAssignmentMark.status;
            })
          );
        } catch {
          //
        }
      },
    }),
  }),
});

export const {
  useAddMarkToAssignmentMutation,
  useAnswerToAssignmentMutation,
  useGetSubmitedAssginmentQuery,
  useGetEditedAssignmentQuery,
} = assignmentMarkApi;
