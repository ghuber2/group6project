// Auth.jsx

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';

// Base API URL, configured via Vite environment variable
// Create a file called .env in your project root with:
// VITE_API_URL=http://localhost:3001
const API_URL = import.meta.env.VITE_API_URL || '';

// Login component
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send credentials to backend to verify against MongoDB
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Login failed');
      }
      // On success, parse returned user data
      const data = await res.json();
      // Store username locally
      localStorage.setItem('username', data.username);
      // Navigate to messages, passing username in location state
      navigate('/messages', { state: { username: data.username } });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <label>
        Username
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

// Signup component
const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Send new user data to backend to store in MongoDB
      const res = await fetch(`${API_URL}/add-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Signup failed');
      }
      // Clear response and inform user
      await res.json();
      alert('Signup successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <label>
        Username
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

// Main Auth router component
export default function Auth() {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link> |{' '}
        <Link to="/signup">Sign Up</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}
