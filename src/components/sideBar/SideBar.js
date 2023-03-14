import React from 'react';
import { Link } from 'react-router-dom';
import ListOptions from './ListOptions';

export default function SideBar() {
  return (
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <ListOptions />
          <li>
            <Link to="/addjob" className="main-menu" id="lws-addJob-menu">
              <i className="fa-solid fa-file-circle-plus" />
              <span>Add NewJob</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
