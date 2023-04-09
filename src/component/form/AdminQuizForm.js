/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useAddNewQuizMutation,
  useEditQuizMutation,
  useGetSingleQuizQuery,
} from '../../features/quizzes/quizzesApi';
import { videoApi } from '../../features/videos/videoApi';
import Error from '../ui/Error';
import ThreeDot from '../ui/loaders/ThreeDot';

export default function AdminQuizForm({ quizId }) {
  const [allVideos, setAllVideos] = useState();
  const [selectedVideo, setSelectedVideo] = useState('');

  const [quizQuestion, setQuizQuestion] = useState('');

  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [optionThree, setOptionThree] = useState('');
  const [optionFour, setOptionFour] = useState('');

  const [checkOptionOne, setCheckOptionOne] = useState(false);
  const [checkOptionTwo, setCheckOptionTwo] = useState(false);
  const [checkOptionThree, setCheckOptionThree] = useState(false);
  const [checkOptionFour, setCheckOptionFour] = useState(false);

  const [addNewQuiz, { isLoading, isError, error }] = useAddNewQuizMutation();
  const [editQuiz, { isLoading: editLoading, error: editError }] = useEditQuizMutation();

  const { data: editQuizInfo } = useGetSingleQuizQuery(quizId);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // reset form
  const resetForm = () => {
    setQuizQuestion('');
    setOptionOne('');
    setOptionTwo('');
    setOptionThree('');
    setOptionFour('');
    setCheckOptionOne(false);
    setCheckOptionTwo(false);
    setCheckOptionThree(false);
    setCheckOptionFour(false);

    setSelectedVideo('');
  };

  // setting edit data to form
  useEffect(() => {
    if (editQuizInfo) {
      const { question, video_title, options } = editQuizInfo || {};
      setQuizQuestion(question);
      setSelectedVideo(video_title);

      setOptionOne(options[0].option);
      setOptionTwo(options[1].option);
      setOptionThree(options[2].option);
      setOptionFour(options[3].option);

      setCheckOptionOne(options[0].isCorrect);
      setCheckOptionTwo(options[1].isCorrect);
      setCheckOptionThree(options[2].isCorrect);
      setCheckOptionFour(options[3].isCorrect);

      console.log('checked', options[0].isCorrect);
    }
  }, [editQuizInfo]);

  //   Get the all videos to set the assignment
  useEffect(() => {
    dispatch(videoApi.endpoints.getAllVideos.initiate())
      .unwrap()
      .then((data) => setAllVideos(data));
  }, [dispatch]);

  const selectedVideoInfo = allVideos?.find((video) => video.title == selectedVideo);

  // add Quiz function
  const handleQuizAdd = (e) => {
    e.preventDefault();
    addNewQuiz({
      question: quizQuestion,
      video_id: selectedVideoInfo?.id,
      video_title: selectedVideoInfo?.title,
      options: [
        {
          id: 1,
          option: optionOne,
          isCorrect: checkOptionOne,
        },
        {
          id: 2,
          option: optionTwo,
          isCorrect: checkOptionTwo,
        },
        {
          id: 3,
          option: optionThree,
          isCorrect: checkOptionThree,
        },
        {
          id: 4,
          option: optionFour,
          isCorrect: checkOptionFour,
        },
      ],
    });

    resetForm();
    navigate('/admin/quizzes');
  };

  // edit Quiz function
  const handleQuizEdit = (e) => {
    e.preventDefault();
    editQuiz({
      id: quizId,
      data: {
        question: quizQuestion,
        video_id: selectedVideoInfo?.id,
        video_title: selectedVideoInfo?.title,
        options: [
          {
            id: 1,
            option: optionOne,
            isCorrect: checkOptionOne,
          },
          {
            id: 2,
            option: optionTwo,
            isCorrect: checkOptionTwo,
          },
          {
            id: 3,
            option: optionThree,
            isCorrect: checkOptionThree,
          },
          {
            id: 4,
            option: optionFour,
            isCorrect: checkOptionFour,
          },
        ],
      },
    });

    resetForm();
    navigate('/admin/quizzes');
  };

  return (
    <form onSubmit={(e) => (quizId ? handleQuizEdit(e) : handleQuizAdd(e))}>
      <div className="space-y-8">
        <div className="fieldContainer ">
          <label>Title</label>

          <input
            required
            type="text"
            placeholder="Title of the quiz"
            value={quizQuestion}
            onChange={(e) => setQuizQuestion(e.target.value)}
          />
        </div>

        <div className="space-y-6 ">
          <div className="fieldContainer">
            <label htmlFor="video-name">Vidoe Title</label>
            <select
              required
              value={selectedVideo}
              onChange={(e) => setSelectedVideo(e.target.value)}
            >
              <option value="" hidden>
                Select Video
              </option>
              {allVideos?.map((video) => (
                <option className="mt-3" key={video.id} value={video.title}>
                  {video.id} - {video.title}
                </option>
              ))}
            </select>
          </div>
          <div className="fieldContainer quiz-field ">
            <label>Option 1</label>
            <input
              type="checkbox"
              checked={checkOptionOne}
              onChange={(e) => setCheckOptionOne(e.target.checked)}
            />
            <input
              required
              type="text"
              value={optionOne}
              onChange={(e) => setOptionOne(e.target.value)}
              placeholder="Enter frist option"
            />
          </div>

          <div className="fieldContainer quiz-field">
            <label>Option 2</label>
            <input
              type="checkbox"
              checked={checkOptionTwo}
              onChange={(e) => setCheckOptionTwo(e.target.checked)}
            />
            <input
              required
              type="text"
              value={optionTwo}
              onChange={(e) => setOptionTwo(e.target.value)}
              placeholder="Enter second option"
            />
          </div>

          <div className="fieldContainer quiz-field">
            <label>Option 3</label>
            <input
              type="checkbox"
              checked={checkOptionThree}
              onChange={(e) => setCheckOptionThree(e.target.checked)}
            />
            <input
              required
              type="text"
              value={optionThree}
              onChange={(e) => setOptionThree(e.target.value)}
              placeholder="Enter third option"
            />
          </div>

          <div className="fieldContainer quiz-field">
            <label>Option 4</label>
            <input
              type="checkbox"
              checked={checkOptionFour}
              onChange={(e) => setCheckOptionFour(e.target.checked)}
            />
            <input
              required
              type="text"
              value={optionFour}
              onChange={(e) => setOptionFour(e.target.value)}
              placeholder="Enter fourth option"
            />
          </div>
        </div>

        <div className="flex justify-between ">
          <button
            type="button"
            className="goback button"
            onClick={() => navigate('/admin/quizzes')}
          >
            Go back
          </button>
          <button type="submit" className="submit button" disabled={isLoading || editLoading}>
            {isLoading || editLoading ? <ThreeDot /> : quizId ? 'Edit' : 'Add'}
          </button>
        </div>
        {isError && <Error message={error?.data} />}
        {editError && <Error message={editError?.data} />}
      </div>
    </form>
  );
}
