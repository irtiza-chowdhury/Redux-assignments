/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useAddNewAssignmentMutation,
  useUpdateSigleAssignmentMutation,
} from '../../features/asignment/assignmentApi';
import { videoApi } from '../../features/videos/videoApi';
import Error from '../ui/Error';
import ThreeDot from '../ui/loaders/ThreeDot';

export default function AssignmentForm({ assignmentId, editAssignmentData }) {
  const [allVideos, setAllVideos] = useState();
  const [assignmentName, setAssignmentName] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');
  const [assignmentNumber, setAssignmentNumber] = useState('');

  const [addNewAssignment, { isLoading, isError, error }] = useAddNewAssignmentMutation();
  const [
    updateSigleAssignment,
    { isLoading: editLoading, isError: editIsError, error: editError },
  ] = useUpdateSigleAssignmentMutation();

  const selectedVideoInfo = allVideos?.find((video) => video.title == selectedVideo);

  //   set Form for edit assignment
  useEffect(() => {
    if (assignmentId) {
      setAssignmentName(editAssignmentData?.title);
      setSelectedVideo(editAssignmentData?.video_title);
      setAssignmentNumber(editAssignmentData?.totalMark);
    }
  }, [
    assignmentId,
    editAssignmentData?.title,
    editAssignmentData?.totalMark,
    editAssignmentData?.video_title,
  ]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //   Get the all videos to set the assignment
  useEffect(() => {
    dispatch(videoApi.endpoints.getAllVideos.initiate())
      .unwrap()
      .then((data) => setAllVideos(data));
  }, [dispatch]);

  //   reset form
  const resetForm = () => {
    setAssignmentName('');
    setSelectedVideo('');
    setAssignmentNumber('');
  };

  //   add new Assignment funtion
  const handleAddAssignment = (e) => {
    e.preventDefault();
    addNewAssignment({
      title: assignmentName,
      video_id: selectedVideoInfo?.id,
      video_title: selectedVideoInfo?.title,
      totalMark: Number(assignmentNumber),
    });

    resetForm();
    navigate('/admin/assignment');
  };

  //   edit existing assignmentfuntion
  const handleEditAssignment = (e) => {
    e.preventDefault();
    updateSigleAssignment({
      id: assignmentId,
      data: {
        title: assignmentName,
        video_id: selectedVideoInfo?.id,
        video_title: selectedVideoInfo?.title,
        totalMark: Number(assignmentNumber),
      },
    });
    resetForm();
    navigate('/admin/assignment');
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => (assignmentId ? handleEditAssignment(e) : handleAddAssignment(e))}
    >
      <div className="fieldContainer">
        <label htmlFor="assignment-name">Assignment Name</label>
        <input
          type="text"
          required
          placeholder="Name of assignment"
          value={assignmentName}
          onChange={(e) => setAssignmentName(e.target.value)}
        />
      </div>

      <div className="fieldContainer">
        <label htmlFor="video-name">Vidoe Title</label>
        <select required value={selectedVideo} onChange={(e) => setSelectedVideo(e.target.value)}>
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
      <div className="fieldContainer">
        <label htmlFor="assignment-name">Assignment Number</label>
        <input
          type="number"
          required
          min={0}
          placeholder="Number of assignment"
          value={assignmentNumber}
          onChange={(e) => setAssignmentNumber(e.target.value)}
        />
      </div>

      <div className="flex justify-between ">
        <button
          type="button"
          className="goback button"
          onClick={() => navigate('/admin/assignment')}
        >
          Go back
        </button>
        <button type="submit" className="submit button" disabled={isLoading || editLoading}>
          {isLoading || editLoading ? <ThreeDot /> : assignmentId ? 'Edit' : 'Add'}
        </button>
      </div>

      {isError && <Error message={error?.data} />}
      {editIsError && <Error message={editError?.data} />}
    </form>
  );
}
