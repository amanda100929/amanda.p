// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from './Quiz';
import Register from './Register';
import Login from './Login';
import Rank from './Rank';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rank" element={<Rank />} />
      </Routes>
    </Router>
  );
}

export default App;
