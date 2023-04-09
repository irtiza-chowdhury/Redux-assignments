/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import AssignmentModal from '../../component/modal/AssignmentModal';
import StudentNav from '../../component/nav/StudentNav';
import Error from '../../component/ui/Error';
import VideoList from '../../component/videos/VideoList';
import { assignmentApi } from '../../features/asignment/assignmentApi';
import { useGetSubmitedAssginmentQuery } from '../../features/assignmentMark/assignmentMarkApi';

import RotatingLine from '../../component/ui/loaders/RotatingLine';
import { useGetQuizMarkQuery } from '../../features/quizmark/quizMarkApi';
import { quizzesApi } from '../../features/quizzes/quizzesApi';
import {
  useGetAllVideosQuery,
  useGetSingleVideoQuery,
  videoApi,
} from '../../features/videos/videoApi';

export default function CoursePlayer() {
  const [allAssignment, setAllAssignment] = useState();
  const [allVideos, setAllVideos] = useState();
  const [allQuizzes, setAllQuizzes] = useState();

  const [opened, setOpened] = useState(false);

  const [checkSubmitAssignment, setCheckSubmitAssignment] = useState();
  const [checkSubmittedQuiz, setCheckSubmittedQuiz] = useState();

  // get submitted assignment and quizzes
  const { data: submittedAssignment } = useGetSubmitedAssginmentQuery();
  const { data: submittedQuiz } = useGetQuizMarkQuery();
  const { data: allDBVideos } = useGetAllVideosQuery();

  // handle modal open and close
  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  // getstudent name from redux state
  const { name } = useSelector((state) => state.auth.user) || {};

  const { videoId } = useParams();

  let desiredVideoId;
  if (allVideos?.length > 0) {
    desiredVideoId = Number(videoId) ? videoId : allDBVideos[0]?.id;
  }

  const { data: singleVideo, isLoading, isError } = useGetSingleVideoQuery(desiredVideoId);

  // checking assignment is availble for this video or not
  const isAssignmentAvailable = allAssignment?.find(
    (assignment) => assignment.video_title == singleVideo?.title
  );

  // checking assignment submitted or not
  useEffect(() => {
    setCheckSubmitAssignment(
      submittedAssignment?.find(
        (assignment) =>
          assignment.title == isAssignmentAvailable?.title && assignment.student_name == name
      )
    );
  }, [isAssignmentAvailable?.title, name, submittedAssignment]);

  // checking quiz is available or not
  const isQuizAvailable = allQuizzes?.filter((quiz) => quiz.video_title == singleVideo?.title);

  // checking quiz is submitted or not
  useEffect(() => {
    setCheckSubmittedQuiz(
      submittedQuiz?.find((quiz) => quiz.video_id == singleVideo?.id && quiz.student_name == name)
    );
  }, [name, singleVideo?.id, submittedQuiz]);

  const dispatch = useDispatch();

  // get the assignments & quizzes and allvideos
  useEffect(() => {
    dispatch(assignmentApi.endpoints.getAllAssignment.initiate())
      .unwrap()
      .then((data) => setAllAssignment(data));

    dispatch(videoApi.endpoints.getAllVideos.initiate())
      .unwrap()
      .then((data) => setAllVideos(data));

    dispatch(quizzesApi.endpoints.getAllQuizzes.initiate())
      .unwrap()
      .then((data) => setAllQuizzes(data));
  }, [dispatch]);

  //   converting date in a readble format
  const dateConvertion = (date) => {
    const newDate = moment(date);
    const convertedDate = newDate.format('D MMMM YYYY');

    return convertedDate;
  };

  // deside what to show and handle error and loading
  let content = null;

  if (isLoading && !isError) {
    content = (
      <div className="flex justify-center mt-6 w-full">
        <RotatingLine />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }
  if (!isLoading && !isError && !singleVideo) {
    content = <Error message="Sorry, no video found" />;
  }
  if (!isLoading && !isError && singleVideo) {
    content = (
      <div className="col-span-full w-full space-y-8 lg:col-span-2">
        <iframe
          width="100%"
          className="aspect-video"
          src={singleVideo?.url}
          title={singleVideo?.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">
            {singleVideo?.title}
          </h1>
          <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
            Uploaded on {dateConvertion(singleVideo?.createdAt)}
          </h2>

          <div className="flex gap-4">
            {isAssignmentAvailable && !checkSubmitAssignment && (
              <button
                type="button"
                onClick={controlModal}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                এসাইনমেন্ট
              </button>
            )}
            {isQuizAvailable?.length > 0 && !checkSubmittedQuiz && (
              <Link
                to={`/quiz/${singleVideo?.id}`}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                কুইজে অংশগ্রহণ করুন
              </Link>
            )}
          </div>
          <p className="mt-4 text-sm text-slate-400 leading-6">{singleVideo?.description}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <StudentNav />
        <div className="py-6 coursePlayer">
          <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="grid grid-cols-3 gap-2 lg:gap-8">
              {content}
              <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30 video-list">
                <VideoList allVideos={allVideos} />
              </div>
            </div>
          </div>
        </div>
        <AssignmentModal
          assignmentInfo={isAssignmentAvailable}
          title={singleVideo?.title}
          opened={opened}
          controlModal={controlModal}
        />
      </div>
    </>
  );
}
