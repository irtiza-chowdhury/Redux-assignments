import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../asset/images/LWSBlog.svg';

export default function Nav() {
  return (
    <nav className="py-4 border-b">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="search" />
          </Link>
        </div>

        <div className="auth-buttons">
          <button type="button" className="btn btn-primary">
            sign in
          </button>
          <button type="button" className="btn btn-outline">
            sign up
          </button>
        </div>
      </div>
    </nav>
  );
}
