import React from 'react';
import AddForm from '../form/AddForm';
import SideBar from '../sideBar/SideBar';

export default function AddJob() {
  return (
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8">
      <SideBar />
      <div className="lg:pl-[14rem] mt-[5.8125rem]">
        <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
          <h1 className="mb-10 text-center lws-section-title">Add New Job</h1>

          <AddForm />
        </main>
      </div>
    </div>
  );
}
