// Signup.js

// Import React and useState hook for component state
import React, { useState } from 'react';
// Import socket.io client (not used here but available for future real-time features)
import io from "socket.io-client";
// Import routing components (Router, Routes, Route, Link) and navigation hook
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Define the Signup component, which optionally takes a `signup` prop (not used here)
function Signup({ signup }) {
  // State to hold the entered username
  const [user, setUser] = useState('');
  // State to hold the entered password
  const [pass, setPass] = useState('');
  // State to hold the entered email
  const [email, setEmail] = useState('');

  const navigate = useNavigate() //for redirecting after signup
  // Handler for form submission to register a new user
  const click = async (e) => {
    // Prevent page reload on form submit
    e.preventDefault();
    try {
      // Send POST request to the server with the signup data
      const res = await fetch('http://localhost:3001/add-user', {
        method: 'POST',
          headers: {
        'Content-Type': 'application/json'
      },
      // Convert state values into JSON string for the request body
      body: JSON.stringify({
        username: user,
        email: email,
        password: pass
      })
      });

      if(!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Signup failed');
      }

      // Parse the JSON response from the server
      const data = await res.json();

      // Show an alert confirming successful signup, displaying returned data
      alert(`Signup successful:\n${JSON.stringify(data, null, 2)}`);
      navigate('/');
    } catch(err) {
      alert('Signup failed: ' + err.message);
    }
  };

  // Update `user` state when the username input changes
  const Userchange = event => {
    setUser(event.target.value);
  }

  // Update `pass` state when the password input changes
  const Passchange = event => {
    setPass(event.target.value);
  }

  // Update `email` state when the email input changes
  const Emailchange = event => {
    setEmail(event.target.value);
  }

  // Render the signup form
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
          type="password"
          required
          value={pass}
          onChange={Passchange}
        />

        <label>Enter Email</label>
        {/* Controlled input for email */}
        <input
          type="text"
          required
          value={email}
          onChange={Emailchange}
        />

        {/* Button submits the form and triggers the click handler */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

// Export the component so it can be used in other parts of the application
export default Signup;
