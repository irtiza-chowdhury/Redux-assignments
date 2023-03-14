import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { jobSorting } from '../../features/sort/sortSlice';

export default function ListOptions() {
  const dispatch = useDispatch();

  const handleTypeSort = (type) => {
    dispatch(jobSorting(type));
  };
  return (
    <li>
      <Link
        to="/"
        className="main-menu menu-active"
        id="lws-alljobs-menu"
        onClick={() => handleTypeSort('Available')}
      >
        <i className="fa-solid fa-briefcase" />
        <span> All Available Jobs</span>
      </Link>
      <ul className="space-y-6 lg:space-y-2 ">
        <li>
          <Link
            to="/"
            className="sub-menu"
            href="/jobs/internship"
            id="lws-internship-menu"
            onClick={() => handleTypeSort('Internship')}
          >
            <i className="fa-solid fa-stop !text-[#FF5757]" />
            Internship
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="sub-menu"
            href="/jobs/fulltime"
            id="lws-fulltime-menu"
            onClick={() => handleTypeSort('Full Time')}
          >
            <i className="fa-solid fa-stop !text-[#FF8A00]" />
            Full Time
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="sub-menu"
            href="/jobs/remote"
            id="lws-remote-menu"
            onClick={() => handleTypeSort('Remote')}
          >
            <i className="fa-solid fa-stop !text-[#56E5C4]" />
            Remote
          </Link>
        </li>
      </ul>
    </li>
  );
}
