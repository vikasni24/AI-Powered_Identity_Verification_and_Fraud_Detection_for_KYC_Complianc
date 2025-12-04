 import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Upload from './pages/Upload/Upload';
import Extract from './pages/Extract/Extract';
import View from './pages/View/View';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/extract" element={<Extract />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;