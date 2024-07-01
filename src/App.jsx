import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { logout } from './slices/userSlice';

function App() {
  const token = useSelector((state) => state.users.toke);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {token ? (
        <section>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </section>
      ) : null}
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/todos" /> : 'display_login_page'}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/todos" /> : 'display_register_page'}
        />
        <Route
          path="/todos"
          element={token ? 'display_todo_page' : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={<Navigate to={token ? '/todos' : '/login'} />}
        />
      </Routes>
    </div>
  );
}

export default App;
