import React from 'react';
import { useParams } from 'react-router-dom';
import AdminVideoForm from '../../component/form/AdminVideoForm';
import AdminNav from '../../component/nav/AdminNav';
import { useGetSingleVideoQuery } from '../../features/videos/videoApi';

export default function EditVideo() {
  const { videoId } = useParams();

  const { data: editVideo } = useGetSingleVideoQuery(videoId);

  return (
    <>
      <AdminNav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
              Edit Video Informations
            </h1>

            <div className="flex justify-center mb-10 space-y-2 md:flex md:space-y-0">
              <AdminVideoForm editVideo={editVideo} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
