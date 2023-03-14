import { configureStore } from '@reduxjs/toolkit';
import jobReducer from '../features/jobs/jobsSlice';
import sortReducer from '../features/sort/sortSlice';

export const store = configureStore({
  reducer: {
    job: jobReducer,
    sort: sortReducer,
  },
});
