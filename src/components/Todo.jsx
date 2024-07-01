import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from '../slices/todoSlice';

export default function Todo() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todo.error);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleCreateTodo = async () => {
    dispatch(createTodo({ title: newTodo }));
    setNewTodo('');
  };

  const handleUpdateTodo = async (id, completed) => {
    dispatch(updateTodo({ id, updateData: { completed: !completed } }));
  };

  const handleDeleteTodo = async (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? 'Completed' : 'Incomplete'}
            <button
              type="button"
              onClick={() => handleUpdateTodo(todo.id, todo.completed)}
            >
              Toggle
            </button>
            <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="button" onClick={handleCreateTodo}>
        Add Todo
      </button>
    </div>
  );
}
