import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');
      console.log('Registering with:', { username, email, password });
      navigate('/login'); // Redirect to login page
    }
  };

  const handleGoogleRegister = () => {
    // Redirect to Google registration page
    window.location.href = 'https://accounts.google.com/signup';
  };

  const handleFacebookRegister = () => {
    // Redirect to Facebook registration page
    window.location.href = 'https://www.facebook.com/r.php';
};


const handleEmailRegister = () => {
  // Redirect to Outlook registration page
  window.location.href = 'https://signup.live.com/signup';
};


  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="register-button">Register</button>
      </form>
      <div className="social-register-buttons">
        <button className="google-button" onClick={handleGoogleRegister}>
          <FontAwesomeIcon icon={faGoogle} /> Register with Google
        </button>
        <button className="facebook-button" onClick={handleFacebookRegister}>
          <FontAwesomeIcon icon={faFacebook} /> Register with Facebook
        </button>
        <button className="email-button" onClick={handleEmailRegister}>
          <FontAwesomeIcon icon={faEnvelope} /> Register with Email
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
