import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Signup from './pages/SignUp';
function App() {
  return (
    <Routes>
      <Route path="/view" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Signup />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
