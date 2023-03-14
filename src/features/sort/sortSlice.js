import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  salarySort: '',
  jobType: 'Available',
  search: '',
};

const sortSlice = createSlice({
  name: 'sortSlice',
  initialState,

  reducers: {
    salarySorting: (state, action) => {
      state.salarySort = action.payload;
    },
    jobSorting: (state, action) => {
      state.jobType = action.payload;
    },
    searchTitle: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default sortSlice.reducer;

export const { salarySorting, jobSorting, searchTitle } = sortSlice.actions;
