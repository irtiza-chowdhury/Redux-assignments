import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPrivateRoute from '../component/routing/adminPrivateRoute';
import AdminPublicRoute from '../component/routing/adminPublicRoute';
import AddAssignment from '../pages/admin/AddAssignment';
import AddQuiz from '../pages/admin/AddQuiz';
import AddVideos from '../pages/admin/AddVideos';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminQuizes from '../pages/admin/AdminQuizes';
import AssignmentList from '../pages/admin/AssignmentList';
import AssignmentMark from '../pages/admin/AssignmentMark';
import DashBoard from '../pages/admin/DashBoard';
import EditAssignment from '../pages/admin/EditAssignment';
import EditQuiz from '../pages/admin/EditQuiz';
import EditVideo from '../pages/admin/EditVideo';
import Videos from '../pages/admin/Videos';

export default function AdminPannel() {
  return (
    <>
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminPublicRoute>
              <AdminLogin />
            </AdminPublicRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/admin/quizzes"
          element={
            <AdminPrivateRoute>
              <AdminQuizes />
            </AdminPrivateRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/admin/quizzes/addquiz"
          element={
            <AdminPrivateRoute>
              <AddQuiz />
            </AdminPrivateRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/admin/quizzes/editquiz/:quizId"
          element={
            <AdminPrivateRoute>
              <EditQuiz />
            </AdminPrivateRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/admin/assignment"
          element={
            <AdminPrivateRoute>
              <AssignmentList />
            </AdminPrivateRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/admin/addassignment"
          element={
            <AdminPrivateRoute>
              <AddAssignment />
            </AdminPrivateRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/admin/editassignment/:assignmentId"
          element={
            <AdminPrivateRoute>
              <EditAssignment />
            </AdminPrivateRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <DashBoard />
            </AdminPrivateRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/admin/videos"
          element={
            <AdminPrivateRoute>
              <Videos />
            </AdminPrivateRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/admin/addvideo"
          element={
            <AdminPrivateRoute>
              <AddVideos />
            </AdminPrivateRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/admin/editvideo/:videoId"
          element={
            <AdminPrivateRoute>
              <EditVideo />
            </AdminPrivateRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/admin/assignmentmark"
          element={
            <AdminPrivateRoute>
              <AssignmentMark />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
