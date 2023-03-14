import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/nav/Nav';
import AddBook from './components/pages/AddBook';
import EditBook from './components/pages/EditBook';
import Home from './components/pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/addbook" element={<AddBook />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/books/:bookId" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
