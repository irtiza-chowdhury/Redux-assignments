import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { salarySorting, searchTitle } from '../../features/sort/sortSlice';

export default function JobSort() {
  const { salarySort } = useSelector((state) => state.sort);
  const dispatch = useDispatch();

  const handleSalarySort = (e) => {
    dispatch(salarySorting(e.target.value));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchTitle(e.target.value.toLowerCase()));
  };

  return (
    <div className="flex gap-4">
      <div className="search-field group flex-1">
        <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500" />
        <input
          type="text"
          placeholder="Search Job"
          className="search-input"
          id="lws-searchJob"
          onChange={handleSearch}
        />
      </div>
      <select
        id="lws-sort"
        name="sort"
        autoComplete="sort"
        className="flex-1"
        value={salarySort}
        onChange={handleSalarySort}
      >
        <option value="">Default</option>
        <option value="lowToHigh">Salary (Low to High)</option>
        <option value="highToLow">Salary (High to Low)</option>
      </select>
    </div>
  );
}
