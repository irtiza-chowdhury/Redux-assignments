import { configureStore } from '@reduxjs/toolkit';
import { apislice } from '../features/api/ApiSlice';
import projectReducer from '../features/projects/projectSlice';

export const store = configureStore({
  reducer: {
    [apislice.reducerPath]: apislice.reducer,

    project: projectReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',

  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apislice.middleware),
});
