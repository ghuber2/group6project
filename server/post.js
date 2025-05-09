// post.js

// Import React and useState for component state
import React, { useState } from 'react';
// Import socket.io client (not used yet but available for future real-time features)
import io from "socket.io-client";
// Import routing utilities to access location state and navigation if needed
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Define the MessagePost component
function MessagePost() {
  // Get router location to retrieve passed-in state (username)
  const location = useLocation();

  // Create a Date object to capture current date & time
  const date = new Date();
  // Extract hours and minutes for timestamp
  const hours = date.getHours();
  const mins = date.getMinutes();

  // Format day and month with leading zeros
  const dateGet = ("0" + date.getDate()).slice(-2); // Day of month
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
  const year = date.getFullYear(); // Full year

  // Combine hours and minutes into HH:MM format
  const time = `${hours}:${mins}`;
  // Combine month, day, year into MM/DD/YYYY format
  const calendar = `${month}/${dateGet}/${year}`;

  // Determine username: from route state, or localStorage, or default 'Guest'
  const username = location.state?.username || localStorage.getItem('username') || 'Guest';
  // Persist username in localStorage for future use
  localStorage.setItem('username', username);

  // Local state for form fields: title, description, latitude, longitude
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [late, setLat] = useState('');
  const [long, setLong] = useState('');

  // Handler for form submission
  const handleSubmit = async (e) => {
    // Prevent default form behavior (page reload)
    e.preventDefault();

    // Send POST request to backend to create a new post
    const res = await fetch('http://localhost:3001/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Package all necessary data into the request body
      body: JSON.stringify({
        lat: late,         // Latitude from state
        long: long,        // Longitude from state
        description: desc, // Description from state
        title: title,      // Title from state
        time: time,        // Timestamp string
        date: calendar,    // Date string
        username: username // Username from route or storage
      })
    });

    // Parse JSON response
    const data = await res.json();
    // Alert user that the post was created successfully
    alert(`Post created:\n${JSON.stringify(data, null, 2)}`);
  };

  // Render the post creation form
  return (
    <div>
      {/* Display current user */}
      <p>{username}</p>
      <form onSubmit={handleSubmit}>
        <label>Enter Title</label>
        {/* Controlled input for title */}
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Enter Description</label>
        {/* Controlled input for description */}
        <input
          type="text"
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <label>Enter Latitude</label>
        {/* Controlled input for latitude */}
        <input
          type="text"
          required
          value={late}
          onChange={(e) => setLat(e.target.value)}
        />

        <label>Enter Longitude</label>
        {/* Controlled input for longitude */}
        <input
          type="text"
          required
          value={long}
          onChange={(e) => setLong(e.target.value)}
        />

        {/* Submit button triggers handleSubmit */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// Export the component for use in the application
export default MessagePost;
