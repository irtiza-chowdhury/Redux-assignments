import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/navBar/NavBar';
import AddJob from './components/pages/AddJob';
import EditJob from './components/pages/EditJob';
import Home from './components/pages/Home';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/addjob" element={<AddJob />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/jobs/:jobId" element={<EditJob />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
