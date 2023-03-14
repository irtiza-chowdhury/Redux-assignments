import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getRelatedPost from './relatedPostAPI';

const initialState = {
  relatedPost: [],
  isLoading: false,
  isError: false,
  error: '',
};

export const fetchRelatedPost = createAsyncThunk(
  'relatedPost/fetchRelatedPost',
  async ({ tags, id }) => {
    const relatedPost = await getRelatedPost({ tags, id });
    return relatedPost;
  }
);

const relatedPostSlice = createSlice({
  name: 'relatedPost',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedPost.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchRelatedPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.relatedPost = action.payload;
      })
      .addCase(fetchRelatedPost.rejected, (state, action) => {
        state.isLoading = false;
        state.relatedPost = {};
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default relatedPostSlice.reducer;
