import React from 'react';
import { useParams } from 'react-router-dom';
import AdminQuizForm from '../../component/form/AdminQuizForm';
import AdminNav from '../../component/nav/AdminNav';

export default function EditQuiz() {
  const { quizId } = useParams();
  return (
    <>
      <AdminNav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <h1 className="mt-2  text-3xl font-bold text-center text-gray-800">Edit Quiz</h1>

            <div className="mt-3 mb-8 text-md font-medium text-center text-gray-800">
              Please don't forget to select the currect answer.
            </div>

            <div className="flex justify-center mb-10  md:flex md:space-y-0">
              <AdminQuizForm quizId={quizId} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
