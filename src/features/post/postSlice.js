import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import getPost, { likeUpdate, saveUpdate } from './postAPI';

const initialState = {
  post: {},
  isLoading: false,
  isError: false,
  error: '',
  likes: null,
  isSaved: null,
};

export const fetchPost = createAsyncThunk('post/fetchPost', async (id) => {
  const post = await getPost(id);
  return post;
});

export const updateLike = createAsyncThunk('post/updateLike', async ({ id, isLiked }) => {
  const likes = await likeUpdate(id, isLiked);
  return likes;
});

export const updateSave = createAsyncThunk('post/updateSave', async ({ id, saved }) => {
  const isSaved = await saveUpdate(id, saved);
  return isSaved;
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
        state.likes = action.payload.likes;
        state.isSaved = action.payload.isSaved;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.post = {};
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(updateLike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likes = action.payload;
      })
      .addCase(updateSave.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSaved = action.payload;
      });
  },
});

export default postSlice.reducer;
