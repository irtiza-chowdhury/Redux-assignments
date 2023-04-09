import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import AddTask from './components/pages/AddTask';

import EditTask from './components/pages/EditTask';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="text-[#111827]">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/edittask/:taskId" element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
