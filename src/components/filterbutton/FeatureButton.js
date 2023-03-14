import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filteringFeature } from '../../features/filter/FilterSlice';

export default function FeatureButton() {
  const { filterFeature } = useSelector((state) => state.filter);

  const dispatch = useDispatch();
  const handleSorting = (featured) => {
    dispatch(filteringFeature(featured));
  };

  return (
    <div className="flex items-center justify-between mb-12">
      <h4 className="mt-2 text-xl font-bold">Book List</h4>

      <div className="flex items-center space-x-4">
        <button
          type="button"
          className={`lws-filter-btn ${filterFeature === 'All' && 'active-filter'}`}
          onClick={() => handleSorting('All')}
        >
          All
        </button>
        <button
          type="button"
          className={`lws-filter-btn ${filterFeature === 'Featured' && 'active-filter'}`}
          onClick={() => handleSorting('Featured')}
        >
          Featured
        </button>
      </div>
    </div>
  );
}
