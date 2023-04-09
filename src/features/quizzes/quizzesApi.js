import { apiSlice } from '../api/apiSlice';

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuizzes: builder.query({
      query: () => '/quizzes',
      providesTags: ['Quizzes'],
    }),
    getSingleQuiz: builder.query({
      query: (id) => `/quizzes/${id}`,
      providesTags: (arg) => [{ type: 'SingleQuiz', id: arg.id }],
    }),

    addNewQuiz: builder.mutation({
      query: (data) => ({
        url: '/quizzes',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Quizzes'],
    }),
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (arg) => [
        'Quizzes',
        {
          type: 'SingleQuiz',
          id: arg.id,
        },
      ],
    }),

    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deleteQuiz = dispatch(
          apiSlice.util.updateQueryData('getAllQuizzes', undefined, (draft) =>
            draft.filter((item) => item.id !== arg)
          )
        );

        try {
          await queryFulfilled;
        } catch {
          deleteQuiz.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllQuizzesQuery,
  useGetSingleQuizQuery,
  useDeleteQuizMutation,
  useAddNewQuizMutation,
  useEditQuizMutation,
} = quizzesApi;
