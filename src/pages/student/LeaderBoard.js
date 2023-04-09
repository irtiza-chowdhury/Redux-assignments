/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudentNav from '../../component/nav/StudentNav';
import Error from '../../component/ui/Error';
import RotatingLine from '../../component/ui/loaders/RotatingLine';
import { useGetSubmitedAssginmentQuery } from '../../features/assignmentMark/assignmentMarkApi';
import { useGetQuizMarkQuery } from '../../features/quizmark/quizMarkApi';
import { userApi } from '../../features/users/userApi';

export default function LeaderBoard() {
  const user = useSelector((state) => state.auth.user) || {};
  const [allUser, setAlluser] = useState();

  const { data: quizzes, isLoading, isError } = useGetQuizMarkQuery();

  const {
    data: assignments,
    isLoading: assignmentLoading,
    isError: assignmentError,
  } = useGetSubmitedAssginmentQuery();

  const getStudentsInfo = allUser?.filter((singleUser) => singleUser.role == 'student');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userApi.endpoints.getAllUsers.initiate())
      .unwrap()
      .then((data) => setAlluser(data));
  }, [dispatch]);

  const allStudentsInfo = [];

  // geting individual students quiz and assignment total mark and creating a new array
  if (!isLoading && !assignmentLoading && !isError && !assignmentError) {
    getStudentsInfo?.forEach((student) => {
      const quizDetail = quizzes
        ?.filter((quiz) => quiz.student_name == student.name && quiz.student_id == student.id)
        .reduce((totalMark, crr) => (totalMark += crr.mark), 0);

      const assignmentDetail = assignments
        ?.filter(
          (assignment) =>
            assignment.student_name == student.name && assignment.student_id == student.id
        )
        .reduce((total, crr) => (total += crr.mark), 0);

      allStudentsInfo.push({
        name: student.name,
        id: student.id,
        quizMark: quizDetail || 0,
        assignmentMark: assignmentDetail || 0,
        totalMark: (quizDetail || 0) + (assignmentDetail || 0),
      });
    });
  }

  // sort to serial the students with the basis of totalMark
  const sortedStudentsInfo = allStudentsInfo?.sort((a, b) => b.totalMark - a.totalMark);

  let prevPosition;
  let prevTotal;

  // creating serial numbers for each individuals
  sortedStudentsInfo?.forEach((item, index) => {
    if (item.totalMark === prevTotal) {
      item.serialNumber = prevPosition;
    } else {
      item.serialNumber = index + 1;
    }
    prevPosition = item.serialNumber;
    prevTotal = item.totalMark;
  });

  // find currentStudent
  const currentUserInfo = sortedStudentsInfo?.find(
    (student) => student.name == user?.name && student.id == user?.id
  );

  // displaying 20 students Results on leader board
  let content = null;

  if ((isLoading || assignmentLoading) && (!isError || !assignmentError)) {
    content = (
      <div className="flex justify-center mt-8">
        <RotatingLine />
      </div>
    );
  }
  if ((!isLoading || !assignmentLoading) && (isError || assignmentError)) {
    content = <Error message="There is an error occured" />;
  }
  if (
    (!isLoading || !assignmentLoading) &&
    (!isError || !assignmentError) &&
    (quizzes?.length > 0 || assignments?.length > 0)
  ) {
    content = sortedStudentsInfo?.slice(0, 20)?.map((student) => (
      <tr className="border-b border-slate-600/50" key={student.id}>
        <td className="table-td text-center">{student.serialNumber}</td>
        <td className="table-td text-center">{student.name}</td>
        <td className="table-td text-center">{student.quizMark}</td>
        <td className="table-td text-center">{student.assignmentMark}</td>
        <td className="table-td text-center">{student.totalMark}</td>
      </tr>
    ));
  }

  return (
    <>
      <StudentNav />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr>
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              {/* CurrentStudents info */}
              <tbody>
                <tr className="border-2 border-cyan">
                  <td className="table-td text-center font-bold">
                    {currentUserInfo?.serialNumber}
                  </td>
                  <td className="table-td text-center font-bold">{currentUserInfo?.name}</td>
                  <td className="table-td text-center font-bold">{currentUserInfo?.quizMark}</td>
                  <td className="table-td text-center font-bold">
                    {currentUserInfo?.assignmentMark}
                  </td>
                  <td className="table-td text-center font-bold">{currentUserInfo?.totalMark}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>
              {/* top 20 students informations */}
              <tbody>{content}</tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
