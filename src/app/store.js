/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import todoReducer from '../slices/todoSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    todos: todoReducer,
  },
});
