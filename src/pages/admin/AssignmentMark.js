/* eslint-disable eqeqeq */
import React from 'react';
import IndividualAssignmentMark from '../../component/assignmentMark/IndividualAssignmentMark';
import AdminNav from '../../component/nav/AdminNav';
import Error from '../../component/ui/Error';
import RotatingLine from '../../component/ui/loaders/RotatingLine';
import { useGetSubmitedAssginmentQuery } from '../../features/assignmentMark/assignmentMarkApi';

export default function AssignmentMark() {
  const { data: submitedAssignment, isLoading, isError } = useGetSubmitedAssginmentQuery();

  // condition checking before rendering
  let content = null;
  if (isLoading && !isError) {
    content = (
      <div className="flex justify-center mt-8">
        <RotatingLine />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = <Error message="There is an error" />;
  }
  if (!isLoading && !isError && submitedAssignment?.length === 0) {
    content = <Error message="There is no submited assignment" />;
  }
  if (!isLoading && !isError && submitedAssignment?.length > 0) {
    content = submitedAssignment?.map((assignment) => (
      <IndividualAssignmentMark key={assignment.id} assignment={assignment} />
    ));
  }

  // find the pending and published mark data
  const pendingMark = submitedAssignment?.filter((assignment) => assignment.status == 'pending');
  const publishedMark = submitedAssignment?.filter(
    (assignment) => assignment.status == 'published'
  );

  return (
    <>
      <AdminNav />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{submitedAssignment?.length} </span>
              </li>
              <li>
                Pending <span>{pendingMark?.length} </span>
              </li>
              <li>
                Mark Sent <span>{publishedMark?.length}</span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4 admin-scroller">
              <table className="divide-y-1 text-base divide-gray-600 w-full ">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
                  </tr>
                </thead>
                {content}
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
