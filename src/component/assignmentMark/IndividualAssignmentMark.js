/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useAddMarkToAssignmentMutation } from '../../features/assignmentMark/assignmentMarkApi';

export default function IndividualAssignmentMark({ assignment }) {
  const [assignmentMark, setAssignmentMark] = useState('');

  const [addMarkToAssignment, { isLoading }] = useAddMarkToAssignmentMutation();

  const { id, student_name, title, createdAt, totalMark, mark, repo_link, status } =
    assignment || {};

  useEffect(() => {
    setAssignmentMark(totalMark);
  }, [totalMark]);

  //   assignment mark add
  const handleAssignmentMark = (assignmentId) => {
    addMarkToAssignment({
      id: assignmentId,
      data: {
        mark: Number(assignmentMark),
        status: 'published',
      },
    });
  };

  //   converting date in a readble format
  const dateConvertion = (date) => {
    const newDate = moment(date);
    const convertedDate = newDate.format('D MMM YYYY, h:mm:ss a');

    return convertedDate;
  };

  return (
    <tbody className="divide-y divide-slate-600/50">
      <tr>
        <td className="table-td">{title} </td>
        <td className="table-td">{dateConvertion(createdAt)}</td>
        <td className="table-td">{student_name}</td>
        <td className="table-td">{repo_link}</td>
        {status == 'pending' ? (
          <td className="table-td input-mark">
            <input
              max={totalMark}
              value={assignmentMark}
              onChange={(e) => setAssignmentMark(e.target.value)}
            />
            <button disabled={isLoading} type="button" onClick={() => handleAssignmentMark(id)}>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </button>
          </td>
        ) : (
          <td className="table-td ">{mark}</td>
        )}
      </tr>
    </tbody>
  );
}
