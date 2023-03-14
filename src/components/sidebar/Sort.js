import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sorting } from '../../features/filter/filterSlice';

export default function Sort() {
  const dispatch = useDispatch();

  const { sort } = useSelector((state) => state.filter);

  const handleSorting = (e) => {
    dispatch(sorting(e.target.value));
  };

  return (
    <div className="sidebar-content">
      <h4>Sort</h4>
      <select
        name="sort"
        id="lws-sort"
        className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
        onChange={handleSorting}
        value={sort}
      >
        <option value="">Default</option>
        <option value="newest">Newest</option>
        <option value="most_liked">Most Liked</option>
      </select>
    </div>
  );
}
