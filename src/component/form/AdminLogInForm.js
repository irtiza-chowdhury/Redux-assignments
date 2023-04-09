/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogInMutation } from '../../features/auth/authApi';
import { adminLoggedIn } from '../../features/auth/authSlice';
import { userApi } from '../../features/users/userApi';
import Error from '../ui/Error';
import ThreeDot from '../ui/loaders/ThreeDot';

export default function AdminLogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userError, setUserError] = useState(false);

  const [allUser, setAlluser] = useState();

  const [logIn, { data: loginUser, isLoading, isError }] = useLogInMutation();

  // get admin's info
  const adminInfo = allUser?.find((item) => item.role == 'admin');

  const dispatch = useDispatch();

  // get all the users
  useEffect(() => {
    dispatch(userApi.endpoints.getAllUsers.initiate())
      .unwrap()
      .then((data) => setAlluser(data));
  }, [dispatch]);

  // authorizing admin to log in
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminInfo?.email == email) {
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

  // setting admin's info to local storage and redux state
  useEffect(() => {
    if (loginUser?.accessToken && loginUser?.user) {
      if (loginUser?.user?.email == adminInfo?.email) {
        localStorage.setItem(
          'admin',
          JSON.stringify({
            accessToken: loginUser?.accessToken,
            user: loginUser?.user,
          })
        );
        dispatch(
          adminLoggedIn({
            adminToken: loginUser?.accessToken,
            admin: loginUser?.user,
          })
        );
        navigate('/admin/dashboard');
      }
    }
  }, [
    adminInfo?.email,
    dispatch,
    isError,
    isLoading,
    loginUser?.accessToken,
    loginUser?.user,
    loginUser?.user?.email,
    navigate,
  ]);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleAdminLogin}>
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

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <Link to="/forgetpassword" className="font-medium text-violet-600 hover:text-violet-500">
            Forgot your password?
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

      {userError && <Error message="You are not authorized to login admin pannel" />}

      {isError && <Error message="Please provide correct email and password" />}
    </form>
  );
}
