import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { feateredChange } from '../redux/filters/action';

export default function Status() {
  const filter = useSelector((state) => state.filter);

  const { status } = filter;
  const dispatch = useDispatch();
  const handleStatus = (featured) => {
    dispatch(feateredChange(featured));
  };
  return (
    <div className="flex items-center justify-between mb-12">
      <h4 className="mt-2 text-xl font-bold">Book List</h4>

      <div className="flex items-center space-x-4">
        <button
          type="button"
          className={`filter-btn ${status === 'All' && 'active-filter'}`}
          id="lws-filterAll"
          onClick={() => handleStatus('All')}
        >
          All
        </button>
        <button
          type="button"
          className={`filter-btn ${status === 'Featured' && 'active-filter'}`}
          id="lws-filterFeatured"
          onClick={() => handleStatus('Featured')}
        >
          Featured
        </button>
      </div>
    </div>
  );
}
