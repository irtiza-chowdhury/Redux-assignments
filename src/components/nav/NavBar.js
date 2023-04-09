import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { searchTask } from '../../features/projects/projectSlice';
import Logo from '../assets/images/svg/logo.svg';

export default function NavBar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleSearch = (e) => {
    navigate('/');
    dispatch(searchTask(e.target.value.toLowerCase()));
  };
  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500" />
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
            onChange={handleSearch}
          />
        </div>
      </div>
    </nav>
  );
}
