/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/image/learningportal.svg';
import { userLoggedOut } from '../../features/auth/authSlice';
import { videoApi } from '../../features/videos/videoApi';

export default function StudentNav() {
  const [allVideos, setAllVideos] = useState();
  const [videoId, setVideoId] = useState();

  const { name } = useSelector((state) => state.auth.user) || {};

  const dispatch = useDispatch();

  // get users and videos and set student's info at redux state
  useEffect(() => {
    dispatch(videoApi.endpoints.getAllVideos.initiate())
      .unwrap()
      .then((data) => setAllVideos(data));

    if (allVideos?.length > 0) {
      setVideoId(allVideos[0]?.id);
    }
  }, [allVideos, dispatch]);

  // handle student logged out
  const handleLogOut = () => {
    localStorage.removeItem('auth');
    dispatch(userLoggedOut());
  };

  return (
    <nav className="shadow-md">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <Link to={`/video/${videoId}`}>
          <img className="h-10" src={logoImg} alt="Logo" />
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/leaderboard">Leaderboard</Link>
          <h2 className="font-bold">{name}</h2>
          <button
            type="button"
            className="flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan "
            onClick={handleLogOut}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
