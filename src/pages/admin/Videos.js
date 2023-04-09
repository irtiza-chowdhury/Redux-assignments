import React from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../../component/nav/AdminNav';
import Error from '../../component/ui/Error';
import RotatingLine from '../../component/ui/loaders/RotatingLine';
import AdminVideos from '../../component/videos/AdminVideos';
import { useGetAllVideosQuery } from '../../features/videos/videoApi';

export default function Videos() {
  const { data: allVideos, isLoading, isError } = useGetAllVideosQuery();

  // showwing videos info on basis of error and loading condition
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
  if (!isLoading && !isError && allVideos?.length === 0) {
    content = <Error message="Sorry, no assignment found" />;
  }
  if (!isLoading && !isError && allVideos?.length > 0) {
    content = allVideos?.map((video) => <AdminVideos key={video.id} video={video} />);
  }

  return (
    <>
      <AdminNav />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link to="/admin/addvideo" className="btn ml-auto">
                Add Video
              </Link>
            </div>
            <div className="overflow-x-auto mt-4 admin-scroller">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
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
