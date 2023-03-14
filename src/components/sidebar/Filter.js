/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveSelected } from '../../features/filter/filterSlice';

export default function Filter() {
  const filter = useSelector((state) => state.filter);

  const { status } = filter;

  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    dispatch(saveSelected(e.target.value));
  };

  return (
    <div className="sidebar-content">
      <h4>Filter</h4>
      <div className="radio-group">
        <div>
          <input
            type="radio"
            name="filter"
            id="lws-all"
            value="All"
            checked={status === 'All'}
            onChange={handleStatusChange}
            className="radio"
          />
          <label htmlFor="lws-all">All</label>
        </div>
        <div>
          <input
            type="radio"
            name="filter"
            id="lws-saved"
            className="radio"
            value="Saved"
            checked={status === 'Saved'}
            onChange={handleStatusChange}
          />
          <label htmlFor="lws-saved">Saved</label>
        </div>
      </div>
    </div>
  );
}
