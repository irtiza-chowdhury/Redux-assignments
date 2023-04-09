import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProjects: undefined,
  search: '',
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    selectedProjects: (state, action) => {
      state.selectedProjects = action.payload;
    },
    searchTask: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { selectedProjects, searchTask } = projectSlice.actions;
export default projectSlice.reducer;
