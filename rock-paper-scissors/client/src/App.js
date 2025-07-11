import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation,Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Game from './pages/Game';
import History from './pages/History';
import Leaderboard from './pages/Leaderboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

// Separate wrapper so we can access location
function AppWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<ProtectedRoute><Game /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
