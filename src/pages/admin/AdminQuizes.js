import React from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../../component/nav/AdminNav';
import Error from '../../component/ui/Error';
import RotatingLine from '../../component/ui/loaders/RotatingLine';
import { useDeleteQuizMutation, useGetAllQuizzesQuery } from '../../features/quizzes/quizzesApi';

export default function AdminQuizes() {
  const { data: quizzes, isLoading, isError } = useGetAllQuizzesQuery();

  const [deleteQuiz] = useDeleteQuizMutation();

  // delete quiz function
  const handleQuizDelete = (id) => {
    deleteQuiz(id);
  };

  // handle the data, loading and error condition
  let content = null;

  if (isLoading && !isError) {
    content = (
      <div className="flex justify-center mt-8">
        <RotatingLine />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }
  if (!isLoading && !isError && quizzes?.length === 0) {
    content = <Error message="Sorry, no quiz found" />;
  }
  if (!isLoading && !isError && quizzes?.length > 0) {
    content = quizzes?.map((item) => (
      <tr key={item.id}>
        <td className="table-td">
          Quiz {item.id} - {item.question}
        </td>
        <td className="table-td">
          {item.video_title.length > 50
            ? `${item.video_title.substring(0, 45)}...`
            : item.video_title}
        </td>
        <td className="table-td flex gap-x-2 justify-center">
          <button type="button" onClick={() => handleQuizDelete(item.id)}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <Link to={`/admin/quizzes/editquiz/${item.id}`}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </Link>
        </td>
      </tr>
    ));
  }

  return (
    <>
      <AdminNav />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link to="/admin/quizzes/addquiz" className="btn ml-auto">
                Add Quiz
              </Link>
            </div>
            <div className="overflow-x-auto mt-4 admin-scroller">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Question</th>
                    <th className="table-th">Video</th>
                    <th className="table-th justify-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50 ">{content}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
