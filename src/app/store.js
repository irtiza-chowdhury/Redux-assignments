import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../features/blogs/blogSlice';
import filterReducer from '../features/filter/filterSlice';
import postReducer from '../features/post/postSlice';
import relatedPostReducer from '../features/relatedPost/relatedPostSlice';

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    post: postReducer,
    relatedPost: relatedPostReducer,
    filter: filterReducer,
  },
});
