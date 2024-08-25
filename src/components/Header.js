import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
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
    <header className="header">
      <h1 className="title">Expense Tracker</h1>
      <nav className="nav">
        <Link to="/dashboard" className="nav-link">
          <span className="icon"></span> Dashboard
        </Link>
        <Link to="/settings" className="nav-link">
          <span className="icon"></span> Settings
        </Link>
        <button onClick={handleLogout} className="nav-link logout-button">
          <span className="icon"></span> LogOut
        </button>
      </nav>
    </header>
  );
}

export default Header;
