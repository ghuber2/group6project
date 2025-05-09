// LoginPage.js

// Import React and necessary hooks/components
import React, { useEffect, useState } from 'react';
// Import socket.io client (not used in this file yet but available)
import io from "socket.io-client";
// Import routing components from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Define the LoginPage component, which receives a `login` prop (not used here yet)
function LoginPage({ login }) {
  // State for storing the username input
  const [user, setUser] = useState('');
  // State for storing the password input
  const [pass, setPass] = useState('');
  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Function to handle form submission (login)
  const click = async (e) => {
    // Prevent the default form submission behavior (page refresh)
    e.preventDefault();

    // Send a POST request to the login endpoint with the username and password
    const res = await fetch('http://192.168.1.153:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user,
        password: pass
      })
    });

    // Parse the JSON response from the server
    const data = await res.json();

    // Save the returned username to localStorage for later use
    localStorage.setItem('username', data.username);
    // Navigate to the /messages route upon successful login
    navigate('/messages');
    // Show an alert confirming the successful login and display returned data
    alert(`Login successful:\n${JSON.stringify(data, null, 2)}`);
  };

  // Handler for username input changes; updates the `user` state
  const Userchange = (event) => {
    setUser(event.target.value);
  }

  // Handler for password input changes; updates the `pass` state
  const Passchange = (event) => {
    setPass(event.target.value);
  }

  // Render the login form
  return (
    <div>
      {/* Form calls `click` on submit */}
      <form onSubmit={click}>
        <label>Enter Username</label>
        {/* Controlled input for username */}
        <input
          type="text"
          required
          value={user}
          onChange={Userchange}
        />

        <label>Enter Password</label>
        {/* Controlled input for password */}
        <input
          type="text"
          required
          value={pass}
          onChange={Passchange}
        />

        {/* Button to trigger login (also submits the form) */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// Export the component so it can be used in other parts of the app
export default LoginPage;
