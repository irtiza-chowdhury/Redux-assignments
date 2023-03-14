import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoImage from '../../asset/images/logo.svg';

export default function NavTitle() {
  return (
    <>
      <img src={LogoImage} width="150px" className="object-contain" alt="Logo" />

      <ul className="hidden md:flex items-center space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) => `cursor-pointer ${isActive && 'font-semibold'}`}
          id="lws-bookStore"
        >
          <li>Book Store</li>
        </NavLink>
        <NavLink
          to="/addbook"
          className={({ isActive }) => `cursor-pointer ${isActive && 'font-semibold'}`}
          id="lws-addBook"
        >
          <li>Add Book</li>
        </NavLink>
      </ul>
    </>
  );
}
