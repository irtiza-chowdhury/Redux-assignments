import React from 'react';
import JobBody from '../jobs/JobBody';
import SideBar from '../sideBar/SideBar';

export default function Home() {
  return (
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 ">
      <SideBar />
      <JobBody />
    </div>
  );
}
