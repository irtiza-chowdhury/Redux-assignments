import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'All',
  sort: '',
};

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,

  reducers: {
    saveSelected: (state, action) => {
      state.status = action.payload;
    },
    sorting: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { saveSelected, sorting } = filterSlice.actions;
