import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: undefined,
  user: undefined,
  adminToken: undefined,
  admin: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
    adminLoggedIn: (state, action) => {
      state.adminToken = action.payload.adminToken;
      state.admin = action.payload.admin;
    },
    adminLoggedOut: (state) => {
      state.adminToken = undefined;
      state.admin = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut, adminLoggedIn, adminLoggedOut } = authSlice.actions;

export default authSlice.reducer;
