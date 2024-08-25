// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Logout.css";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('profile'); // Remove user profile data or tokens
    sessionStorage.clear(); // Clear any session data

    // Optionally notify the user (e.g., using a toast or alert)
    alert('You have been logged out.');

    // Redirect to login or home page
    navigate('/login'); // Adjust to your login or home route
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}

export default Logout;
