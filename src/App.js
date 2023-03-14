import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Home from './components/page/Home';
import Post from './components/page/Post';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:postId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
