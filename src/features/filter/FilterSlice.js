import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterFeature: 'All',
  search: '',
};

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    filteringFeature: (state, action) => {
      state.filterFeature = action.payload;
    },
    searchName: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { filteringFeature, searchName } = filterSlice.actions;
