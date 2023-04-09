import React from 'react';
import AssignmentForm from '../../component/form/AssignmentForm';
import AdminNav from '../../component/nav/AdminNav';

export default function AddAssignment() {
  return (
    <>
      <AdminNav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
              Add New Assignment
            </h1>

            <div className="flex justify-center mb-10 space-y-2 md:flex md:space-y-0">
              <AssignmentForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
