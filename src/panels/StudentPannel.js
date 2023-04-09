import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentPrivateRoute from '../component/routing/studentPrivateRoute';
import StudentPublicRoute from '../component/routing/studentPublicRoute';
import CoursePlayer from '../pages/student/CoursePlayer';
import LeaderBoard from '../pages/student/LeaderBoard';
import Login from '../pages/student/Login';
import Quiz from '../pages/student/Quiz';
import Registration from '../pages/student/Registration';

export default function StudentPannel() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <StudentPublicRoute>
              <Login />
            </StudentPublicRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/registration"
          element={
            <StudentPublicRoute>
              <Registration />
            </StudentPublicRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/video/:videoId"
          element={
            <StudentPrivateRoute>
              <CoursePlayer />
            </StudentPrivateRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/quiz/:videoId"
          element={
            <StudentPrivateRoute>
              <Quiz />
            </StudentPrivateRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/leaderboard"
          element={
            <StudentPrivateRoute>
              <LeaderBoard />
            </StudentPrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
