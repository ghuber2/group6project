// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: implement actual login logic
    try {
      //Sends a POST request to the backend login route
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }) //Send username and password
      });

      //If login failed, show an error
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Login failed');
      }
      //If login was successful, parse the returned data
      const data = await res.json();
      localStorage.setItem('username', data.username); //saves username
      //Redirect to home page after logging in
      navigate('/Home');
    } catch (err) {
      //Show error message if log in fails
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>

        {error && (
          <p className="form-error">{error}</p>
        )}

        <button type="submit" className="form-button">
          Log In
        </button>
      </form>
      <p className="form-footer">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>

  );
}
