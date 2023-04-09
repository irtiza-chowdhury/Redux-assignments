/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/autocomplete-valid */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEditPasswordMutation, userApi } from '../../features/users/userApi';
import Error from '../ui/Error';
import ThreeDot from '../ui/loaders/ThreeDot';

export default function FormForgetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [allUser, setAlluser] = useState();

  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [editPassword, { data: loginUser, isLoading, isError, error }] = useEditPasswordMutation();

  // find user is valid or not
  const userInfo = allUser?.find((item) => item.email == email);

  // find admin
  const adminInfo = allUser?.find((user) => user.role == 'admin');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // get all the users
  useEffect(() => {
    dispatch(userApi.endpoints.getAllUsers.initiate())
      .unwrap()
      .then((data) => setAlluser(data));
  }, [dispatch]);

  // check user is student or admin and routing to the correcponding page
  useEffect(() => {
    if (adminInfo?.email == userInfo?.email) {
      if (!isLoading && !isError && loginUser?.email && loginUser?.id) {
        navigate('/admin');
      }
    }
    if (adminInfo?.email !== userInfo?.email) {
      if (!isLoading && !isError && loginUser?.email && loginUser?.id) {
        navigate('/');
      }
    }
  }, [adminInfo, isError, isLoading, loginUser?.email, loginUser?.id, navigate, userInfo?.email]);

  // change password request
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (userInfo) {
      setEmailError(false);
      if (password == confirmPassword) {
        setPasswordError(false);
        const { id } = userInfo || {};
        editPassword({
          id,
          data: {
            password,
          },
        });
        setPassword('');
        setConfirmPassword('');
      }
      if (password !== confirmPassword) {
        setPasswordError(true);
      }
    }
    if (!userInfo) {
      setEmailError(true);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handlePasswordChange}>
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

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <Link
            onClick={() => navigate(-1)}
            className="font-medium text-violet-600 hover:text-violet-500"
          >
            Go Back
          </Link>
        </div>
      </div>

      <div>
        <button
          disabled={isLoading}
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          {isLoading ? <ThreeDot /> : 'Change password'}
        </button>
      </div>

      {isError && <Error message={error?.data} />}

      {emailError && <Error message="Please provide valid email" />}
      {passwordError && <Error message="Please confirm your password" />}
    </form>
  );
}
