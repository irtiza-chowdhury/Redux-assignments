import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { videoApi } from '../../features/videos/videoApi';
import useAuth from '../../hooks/useAuth';

export default function StudentPublicRoute({ children }) {
  const [allVideos, setAllVideos] = useState();
  const isLoggedIn = useAuth();

  const dispatch = useDispatch();

  // get all videos to fixed the url and get the first video in course-player page
  useEffect(() => {
    dispatch(videoApi.endpoints.getAllVideos.initiate())
      .unwrap()
      .then((data) => setAllVideos(data));
  }, [dispatch]);

  if (allVideos?.length > 0) {
    return !isLoggedIn ? children : <Navigate to={`/video/${allVideos[0]?.id}`} />;
  }

  return !isLoggedIn ? children : <Navigate to="/video/:vidoeId" />;
}
