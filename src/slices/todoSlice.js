/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../service/api';

/**
 * 01 - Thunk
 * fetchTodos, createTodo, updateTodo, deleteTodo
 */
export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  const response = await apiRequest('get', '/todos');
  return response.data.userTodos;
});

export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async (newTodoData, { dispatch }) => {
    const response = await apiRequest('post', '/todos', newTodoData);
    dispatch(fetchTodos());
    return response.data.data.newTodo;
  }
);

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async ({ id, updateData }, { dispatch }) => {
    const response = await apiRequest('put', `/todos/${id}`, updateData);
    dispatch(fetchTodos());
    return response.data.data.updatedTodo;
  }
);

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id, { dispatch }) => {
    await apiRequest('delete', `/todos/${id}`);
    dispatch(fetchTodos());
    return id; // untuk melakukan filter todo di action
  }
);

/**
 * 02 - initialState
 */
const initialState = {
  todos: [],
  status: 'idle',
  error: null,
};

/**
 * 03 - createSlice
 */
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

/**
 * 04 - export reducer
 */
export default todoSlice.reducer;
