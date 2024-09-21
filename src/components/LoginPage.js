import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
    } else {
      setError('');
      // Add authentication logic here
      console.log('Logging in with:', { username, password });

      // Navigate to the home page on successful login
      navigate('/dashboard');
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        
        <div className="button-group">
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="back-button" onClick={handleBackClick}>Back</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
