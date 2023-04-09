import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAnswerToAssignmentMutation } from '../../features/assignmentMark/assignmentMarkApi';
import Error from '../ui/Error';

export default function AssignmentModal({ assignmentInfo, title, opened, controlModal }) {
  const [asignmentRepoLink, setAssignmentRepoLink] = useState('');

  const user = useSelector((state) => state.auth.user) || {};

  const [answerToAssignment, { isLoading, error }] = useAnswerToAssignmentMutation();

  // handle Submitting assignment function
  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    answerToAssignment({
      student_id: user?.id,
      student_name: user?.name,
      assignment_id: assignmentInfo?.id,
      title: assignmentInfo?.title,
      createdAt: new Date().toISOString(),
      totalMark: assignmentInfo?.totalMark,
      mark: 0,
      repo_link: asignmentRepoLink,
      status: 'pending',
    });
    setAssignmentRepoLink('');
    controlModal();
  };

  return (
    opened && (
      <div className=" modal-container">
        <div className="py-6 bg-primary modal-body ">
          <div onClick={controlModal} className=" flex justify-end cursor-pointer px-5">
            <span className="me-4">X</span>
          </div>
          <div className="mx-auto max-w-full  lg:px-20">
            <div className="px-3 py-20 bg-opacity-10">
              <h1 className="mt-4 mb-8 text-xl font-bold text-center text-gray-800">{title}</h1>
              <h1 className="mt-4 mb-8 text-2xl font-bold text-center text-gray-800">
                {assignmentInfo?.title}
              </h1>

              <div className="flex justify-center  space-y-2 md:flex md:space-y-0">
                <form onSubmit={handleAssignmentSubmit}>
                  <div className="fieldContainer">
                    <label htmlFor="assignment-name">Github link</label>
                    <input
                      type="text"
                      required
                      placeholder="Link of repository"
                      value={asignmentRepoLink}
                      onChange={(e) => setAssignmentRepoLink(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="submit button" disabled={isLoading}>
                      Submit
                    </button>
                  </div>
                </form>

                {error && <Error message={error?.data} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
