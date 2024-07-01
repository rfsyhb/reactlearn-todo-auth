/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../service/api';

/**
 * 01 - Thunks
 * registerUser(userData), loginUser(credentials), fetchUsers()
 */
export const registerUser = createAsyncThunk(
  'users/register',
  async (userData) => {
    const response = await apiRequest('post', '/users/register', userData);
    return response.data.newUser;
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async (credentials) => {
    const response = await apiRequest('post', '/users/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data.token;
  }
);

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await apiRequest('get', '/users');
  return response.data.data.users;
});

/**
 * 02 - intialState
 */
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  users: [],
  status: 'idle',
  error: null,
};

/**
 * 03 - slice
 */
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // logout -> hapus data authed User
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

/**
 * 04 - export
 * action dan reducer
 */
export const { logout } = userSlice.actions;
export default userSlice.reducer;
