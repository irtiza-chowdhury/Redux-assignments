/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogInMutation } from '../../features/auth/authApi';

import { userLoggedIn } from '../../features/auth/authSlice';
import { userApi } from '../../features/users/userApi';
import { videoApi } from '../../features/videos/videoApi';
import Error from '../ui/Error';
import ThreeDot from '../ui/loaders/ThreeDot';

export default function StudentLogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [allVideos, setAllVideos] = useState();
  const [allUser, setAlluser] = useState();
  const [userError, setUserError] = useState(false);

  const [logIn, { data: loginUser, isLoading, isError }] = useLogInMutation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userApi.endpoints.getAllUsers.initiate())
      .unwrap()
      .then((data) => setAlluser(data));

    dispatch(videoApi.endpoints.getAllVideos.initiate())
      .unwrap()
      .then((data) => setAllVideos(data));
  }, [dispatch]);

  const studentsInfo = allUser?.filter((user) => user.role !== 'admin');

  const validStudent = studentsInfo?.some((user) => user?.email == email);

  // login handeler check if user is student or not
  const handleStudentLogin = (e) => {
    e.preventDefault();
    if (validStudent) {
      setUserError(false);
      logIn({
        email,
        password,
      });
    } else {
      setUserError((prev) => !prev);
    }

    setPassword('');
  };

  const navigate = useNavigate();

  // setting student's info to local storage and redux state
  useEffect(() => {
    if (validStudent && loginUser?.accessToken && allVideos) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          accessToken: loginUser?.accessToken,
          user: loginUser?.user,
        })
      );
      dispatch(
        userLoggedIn({
          accessToken: loginUser?.accessToken,
          user: loginUser?.user,
        })
      );
      navigate(`/video/${allVideos[0].id}`);
    }
  }, [navigate, loginUser?.accessToken, validStudent, allVideos, loginUser?.user, dispatch]);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleStudentLogin}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="login-input rounded-t-md"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="login-input rounded-b-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link to="/forgetpassword" className="font-medium text-violet-600 hover:text-violet-500">
            Forgot your password?
          </Link>
        </div>
        <div className="text-sm">
          <Link to="/registration" className="font-medium text-violet-600 hover:text-violet-500">
            Create New Account
          </Link>
        </div>
      </div>

      <div>
        <button
          disabled={isLoading}
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          {isLoading ? <ThreeDot /> : 'Sign in'}
        </button>
      </div>

      {userError && <Error message="Please create an account before login" />}
      {isError && <Error message="Please provide correct email and password" />}
    </form>
  );
}
