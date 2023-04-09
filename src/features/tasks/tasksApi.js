import { apislice } from '../api/ApiSlice';

export const tasksApi = apislice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks',
    }),

    getEditedTask: builder.query({
      query: (id) => `/tasks/${id}`,
    }),

    addNewTask: builder.mutation({
      query: (data) => ({
        url: '/tasks',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: addedTask } = await queryFulfilled;

          dispatch(
            apislice.util.updateQueryData('getTasks', undefined, (draft) => {
              draft.push(addedTask);
            })
          );
        } catch (err) {
          console.log('err', err);
        }
      },
    }),
    editTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedTask } = await queryFulfilled;

          dispatch(
            apislice.util.updateQueryData('getEditedTask', arg.id.toString(), () => updatedTask)
          );

          dispatch(
            apislice.util.updateQueryData('getTasks', undefined, (draft) => {
              // eslint-disable-next-line eqeqeq
              const targetTask = draft.find((c) => c.id == arg.id);

              targetTask.taskName = updatedTask.taskName;
              targetTask.teamMember = updatedTask.teamMember;
              targetTask.project = updatedTask.project;
              targetTask.deadline = updatedTask.deadline;
              targetTask.status = updatedTask.status;
            })
          );
        } catch (err) {
          console.log('err', err);
        }
      },
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deletedID = dispatch(
          apislice.util.updateQueryData('getTasks', undefined, (draft) =>
            draft.filter((item) => item.id !== arg)
          )
        );
        try {
          await queryFulfilled;
        } catch {
          deletedID.undo();
        }
      },
    }),
  }),
});

export const {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useGetEditedTaskQuery,
  useAddNewTaskMutation,
  useEditTaskMutation,
} = tasksApi;
