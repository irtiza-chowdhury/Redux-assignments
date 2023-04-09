import { apiSlice } from '../api/apiSlice';

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMark: builder.query({
      query: () => '/quizMark',
    }),

    answerTheQuiz: builder.mutation({
      query: (data) => ({
        url: '/quizMark',
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: answeredQuiz } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData('getQuizMark', undefined, (draft) => {
              draft.push(answeredQuiz);
            })
          );
        } catch {
          // do nothing
        }
      },
    }),
  }),
});

export const { useGetQuizMarkQuery, useAnswerTheQuizMutation } = quizMarkApi;
