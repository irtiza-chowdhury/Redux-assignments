/* eslint-disable no-nested-ternary */
/* eslint-disable import/order */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewVideoMutation, useEditSingleVideoMutation } from '../../features/videos/videoApi';
import Error from '../ui/Error';
import ThreeDot from '../ui/loaders/ThreeDot';

export default function AdminVideoForm({ editVideo }) {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescriptions, setVideoDescriptions] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [videoViews, setVideoViews] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [videoCreatedAt, setVideoCreatedAt] = useState('');

  const [addNewVideo, { isLoading, error }] = useAddNewVideoMutation();
  const [editSingleVideo, { isLoading: editLoading, error: editError }] =
    useEditSingleVideoMutation();

  const navigate = useNavigate();

  //   reset videos
  const resetForm = () => {
    setVideoTitle('');
    setVideoDescriptions('');
    setVideoLink('');
    setVideoViews('');
    setVideoDuration('');
    setVideoCreatedAt('');
  };

  //  video view conversion to number
  function transformViews(x) {
    const parsed = parseFloat(x);
    return x?.endsWith('k') ? parsed * 1 : parsed;
  }

  // edit video data setting to form
  useEffect(() => {
    const { title, description, url, views, duration, createdAt } = editVideo || {};
    if (editVideo) {
      setVideoTitle(title);
      setVideoDescriptions(description);
      setVideoLink(url);
      setVideoViews(transformViews(views));
      setVideoDuration(duration);
      setVideoCreatedAt(moment(createdAt).format('YYYY-MM-DD'));
    }
  }, [editVideo]);

  // edit video handleing function
  const handleEditVideo = (e) => {
    e.preventDefault();
    editSingleVideo({
      id: editVideo?.id,
      data: {
        title: videoTitle,
        description: videoDescriptions,
        url: videoLink,
        views: `${videoViews}k`,
        duration: videoDuration,
        createdAt: moment().toDate().toISOString(videoCreatedAt),
      },
    });
    resetForm();
    navigate('/admin/videos');
  };

  //   add video fuction
  const handleAddVideo = (e) => {
    e.preventDefault();
    addNewVideo({
      title: videoTitle,
      description: videoDescriptions,
      url: videoLink,
      views: `${videoViews}k`,
      duration: videoDuration,
      createdAt: moment().toDate().toISOString(videoCreatedAt),
    });
    resetForm();
    navigate('/admin/videos');
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => (editVideo ? handleEditVideo(e) : handleAddVideo(e))}
    >
      <div className="fieldContainer">
        <label>Vidoe Name</label>
        <input
          type="text"
          required
          placeholder="Title of the video"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
        />
      </div>
      <div className="fieldContainer">
        <label>Descriptions</label>
        <textarea
          type="text"
          rows={5}
          required
          placeholder="About of the video"
          value={videoDescriptions}
          onChange={(e) => setVideoDescriptions(e.target.value)}
        />
      </div>
      <div className="fieldContainer">
        <label>Embed URL</label>
        <input
          type="text"
          required
          placeholder="Youtube link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
      </div>

      <div className="video-formFields">
        <div className="video-field">
          <label>Views</label>
          <input
            className="modifiedWidth"
            type="number"
            required
            min={0}
            placeholder="Views"
            value={videoViews}
            onChange={(e) => setVideoViews(e.target.value)}
          />
        </div>
        <div className="video-field">
          <label>Duration</label>
          <input
            className="modifiedWidth"
            type="text"
            required
            placeholder="min : sec"
            value={videoDuration}
            onChange={(e) => setVideoDuration(e.target.value)}
          />
        </div>
        <div className="video-field">
          <label>Date</label>
          <input
            type="date"
            required
            value={videoCreatedAt}
            onChange={(e) => setVideoCreatedAt(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between ">
        <button type="button" className="goback button" onClick={() => navigate('/admin/videos')}>
          Go back
        </button>
        <button type="submit" className="submit button" disabled={isLoading || editLoading}>
          {isLoading || editLoading ? <ThreeDot /> : editVideo ? 'Edit' : 'Add'}
        </button>
      </div>

      {error && <Error message={error?.data} />}
      {editError && <Error message={editError?.data} />}
    </form>
  );
}
