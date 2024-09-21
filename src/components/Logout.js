// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Logout.css";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Set this during logout
    sessionStorage.clear(); // Clear any session data

    alert('You have been logged out.');

    navigate('/'); // Adjust to your login or home route
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}

export default Logout;
