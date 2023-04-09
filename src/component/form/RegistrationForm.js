/* eslint-disable jsx-a11y/autocomplete-valid */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useRegistrationMutation } from '../../features/auth/authApi';
import { videoApi } from '../../features/videos/videoApi';
import Error from '../ui/Error';
import ThreeDot from '../ui/loaders/ThreeDot';

export default function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [allVideos, setAllVideos] = useState();

  const [passwordError, setPasswordError] = useState(false);

  const [registration, { data: registerData, isLoading, isError, error }] =
    useRegistrationMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get all videos silent request
  useEffect(() => {
    dispatch(videoApi.endpoints.getAllVideos.initiate())
      .unwrap()
      .then((data) => setAllVideos(data));

    if (!isLoading && !isError && registerData?.accessToken && registerData?.user?.id) {
      navigate(`/video/${allVideos[0].id}`);
    }
  }, [allVideos, dispatch, isError, isLoading, navigate, registerData]);

  // registration request
  const handleRegistration = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setPasswordError(false);
      registration({
        name: userName,
        email,
        password,
        role: 'student',
      });
      setPassword('');
      setConfirmPassword('');
    }
    if (password !== confirmPassword) {
      setPasswordError(true);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleRegistration}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="name"
            autoComplete="name"
            required
            className="login-input rounded-t-md"
            placeholder="Student Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
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
            className="login-input "
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
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="confirm-password"
            required
            className="login-input rounded-b-md"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-end pt-2">
        <div className="text-sm">
          <Link to="/" className="font-medium text-violet-600 hover:text-violet-500 ">
            Already have an account
          </Link>
        </div>
      </div>

      <div>
        <button
          disabled={isLoading}
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          {isLoading ? <ThreeDot /> : 'Create Account'}
        </button>
      </div>

      {isError && <Error message={error?.data} />}

      {passwordError && <Error message="Please confirm your password" />}
    </form>
  );
}
