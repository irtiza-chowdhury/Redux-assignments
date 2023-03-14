import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleEditPost } from '../../features/jobs/jobsSlice';
import EditForm from '../form/EditForm';
import SideBar from '../sideBar/SideBar';
import RotatingLine from '../ui/loaders/RotatingLine';

export default function EditJob() {
  const { jobId } = useParams();

  const { editData, isLoading, isError } = useSelector((state) => state.job);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleEditPost(jobId));
  }, [dispatch, jobId]);

  let content = null;
  if (isLoading)
    content = (
      <div className="rotatingLine">
        <RotatingLine />
      </div>
    );

  if (!isLoading && isError) content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && editData?.id >= 0) {
    content = <EditForm editData={editData} />;
  }

  if (!isLoading && !isError && editData?.id === -1) {
    content = <p>No jobs found!</p>;
  }

  return (
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8">
      <SideBar />
      <div className="lg:pl-[14rem] mt-[5.8125rem]">
        <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
          <h1 className="mb-10 text-center lws-section-title">Edit Job</h1>

          {content}
        </main>
      </div>
    </div>
  );
}
