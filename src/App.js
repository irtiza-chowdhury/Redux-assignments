import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Spinner from './component/ui/loaders/Spinner';
import useAuthChecked from './hooks/useAuthChecked';
import ForgetPassword from './pages/ForgetPassword';
import AdminPannel from './panels/AdminPannel';
import StudentPannel from './panels/StudentPannel';

function App() {
  const authChecked = useAuthChecked();

  return !authChecked ? (
    <div className="flex justify-center mt-4">
      <Spinner />
    </div>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
      <AdminPannel />
      <StudentPannel />
    </BrowserRouter>
  );
}

export default App;
