/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import StudentNav from '../../component/nav/StudentNav';
import SingleQuiz from '../../component/singleQuiz/SingleQuiz';
import Error from '../../component/ui/Error';
import RotatingLine from '../../component/ui/loaders/RotatingLine';
import ThreeDot from '../../component/ui/loaders/ThreeDot';
import { useAnswerTheQuizMutation } from '../../features/quizmark/quizMarkApi';
import { useGetAllQuizzesQuery } from '../../features/quizzes/quizzesApi';

export default function Quiz() {
  const user = useSelector((state) => state.auth.user) || {};

  const [answerTheQuiz, { isLoading, isError }] = useAnswerTheQuizMutation();

  const { data: quizzes, isLoading: quizLoading, isError: quizError } = useGetAllQuizzesQuery();

  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [videoTitle, setVideoTitle] = useState();

  const navigate = useNavigate();
  const { videoId } = useParams();

  // find the quizes for this video
  const quizesForThisVideo = quizzes?.filter((quiz) => quiz.video_id == videoId);

  useEffect(() => {
    if (quizesForThisVideo) {
      setVideoTitle(quizesForThisVideo[0].video_title);
    }
  }, [quizesForThisVideo]);

  // get all the selected options which are selected by a student
  const handleGetAllSelectedQuizzes = (e, item) => {
    let updatedList = [...selectedQuiz];

    if (!e.target.checked) {
      updatedList.splice(selectedQuiz.indexOf(item), 1);
    } else {
      updatedList = [...selectedQuiz, item];
    }

    setSelectedQuiz(updatedList);
  };

  // submit quiz to database and calculate the corrected value
  const handleQuizSubmit = () => {
    let count = 0;

    quizesForThisVideo?.forEach((video) => {
      const correctAnswers = video.options.filter((siVideo) => siVideo.isCorrect === true);
      const selectedAnswers = selectedQuiz?.filter((quiz) => quiz.questionId === video.id);

      if (
        correctAnswers.length === selectedAnswers.length &&
        selectedAnswers.every((answer) => answer.item.isCorrect === true)
      ) {
        count += 5;
      }

      return count;
    });

    if (quizesForThisVideo) {
      const totalQuiz = quizesForThisVideo?.length;
      const totalNumber = totalQuiz * 5;
      const totalCorrected = count / 5;
      const totalWrong = totalQuiz - totalCorrected;

      answerTheQuiz({
        student_id: user?.id,
        student_name: user?.name,
        video_id: Number(videoId),
        video_title: videoTitle,
        totalQuiz,
        totalCorrect: totalCorrected,
        totalWrong,
        totalMark: totalNumber,
        mark: count,
      });

      navigate('/leaderboard');
    }
  };

  // The way of handeling quizes to show
  let content = null;

  if (quizLoading && !quizError) {
    content = (
      <div className="flex justify-center mt-8">
        <RotatingLine />
      </div>
    );
  }
  if (!quizLoading && quizError) {
    content = <Error message="There is an error occured" />;
  }
  if (!quizLoading && !quizError && quizesForThisVideo?.length > 0) {
    content = quizesForThisVideo?.map((quiz) => (
      <SingleQuiz
        key={quiz.id}
        quiz={quiz}
        handleGetAllSelectedQuizzes={handleGetAllSelectedQuizzes}
      />
    ));
  }

  return (
    <>
      <StudentNav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              Quizzes for "{quizesForThisVideo && quizesForThisVideo[0]?.video_title}"
            </h1>
            <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
          </div>
          <div className="space-y-8 ">{content}</div>
        </div>
        <div className="flex justify-between item-center mt-10 w-full">
          <button type="button" className="button" onClick={() => navigate(`/video/${videoId}`)}>
            Previous Page
          </button>
          <button type="button" className="button" onClick={handleQuizSubmit} disabled={isLoading}>
            {isLoading ? <ThreeDot /> : 'Submit'}
          </button>
        </div>
        {isError && <Error message="There was an error occured" />}
      </section>
    </>
  );
}
