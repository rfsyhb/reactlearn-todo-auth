import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { logout } from './slices/userSlice';
import Login from './components/Login';
import Register from './components/Register';
import Todo from './components/Todo';

function App() {
  const token = useSelector((state) => state.users.token);
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
          element={token ? <Navigate to="/todos" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/todos" /> : <Register />}
        />
        <Route
          path="/todos"
          element={token ? <Todo /> : <Navigate to="/login" />}
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
