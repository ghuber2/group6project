import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Send a POST request to the backend to create the user
      const res = await fetch('http://localhost:3001/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }) //Send form data
      });
      
      //If creation failed, throw error
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Signup failed');
      }

      //Parse response and show success alert
      const data = await res.json();
      alert(`Account created for ${data.username}`);
      navigate('/'); //redirect to login page
    } catch (err) {
      setError(err.message); //error if signup fails
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
            placeholder='Username'
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
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>

        {error && (
          <p className="form-error">{error}</p>
        )}

        <button type="submit" className="form-button">
          Register
        </button>
      </form>
      <p className="form-footer">
        Already have an account? <Link to="/">Log in</Link>
      </p>
    </div>
  );
}
