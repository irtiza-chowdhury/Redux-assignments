import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addJob, deleteJob, editJob, getEditJob, getJob } from './jobsAPi';

const initialState = {
  jobs: [],
  isLoading: false,
  isError: false,
  error: '',
  editData: {},
};

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const jobs = await getJob();
  return jobs;
});

export const createJobs = createAsyncThunk('jobs/createJobs', async (data) => {
  const job = await addJob(data);
  return job;
});

export const updateJobs = createAsyncThunk('jobs/updateJobs', async ({ id, data }) => {
  const job = await editJob(id, data);
  return job;
});

export const removeJobs = createAsyncThunk('jobs/removeJobs', async (id) => {
  const job = await deleteJob(id);
  return job;
});

export const getSingleEditPost = createAsyncThunk('jobs/getSingleEditPost', async (id) => {
  const editData = await getEditJob(id);
  return editData;
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(createJobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs.push(action.payload);
      })
      .addCase(createJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(updateJobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const indexToUpdate = state.jobs.findIndex((job) => job.id === action.payload.id);

        state.jobs[indexToUpdate] = action.payload;
      })
      .addCase(updateJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(removeJobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = state.jobs.filter((job) => job.id !== action.meta.arg);
      })
      .addCase(removeJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(getSingleEditPost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getSingleEditPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.editData = action.payload;
      })
      .addCase(getSingleEditPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default jobsSlice.reducer;
