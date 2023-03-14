import { configureStore } from '@reduxjs/toolkit';
import { ApiSlice } from '../features/api/ApiSlice';
import filterReducer from '../features/filter/FilterSlice';

export const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(ApiSlice.middleware),
});
