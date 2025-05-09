// message.js

// Import React and necessary hooks/components
import React, { useState, useEffect } from 'react';
// Import router utilities to access route state
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
// Import socket.io client for real-time communication
import io from "socket.io-client";
// Import clear utility (not used here yet)
import { clear } from '@testing-library/user-event/dist/clear';

// Establish a socket connection to the server
const socket = io.connect("http://localhost:3001");

// Define the Usermessage component
function Usermessage() {
  // Get current date/time for timestamp display
  const date = new Date();
  const hours = date.getHours();
  const mins = date.getMinutes();
  const time = `${hours}:${mins}`; // Format time as HH:MM
  const dateGet = date.getDate();
  const month = date.getMonth();

  // State for the current message input
  const [message, setMessage] = useState('');
  // Get location from router to access passed-in state
  const location = useLocation();
  // Determine username: from route state, or localStorage, or default to 'Guest'
  const username = location.state?.username || localStorage.getItem('username') || 'Guest';
  // State for list of received messages
  const [messagelist, setlist] = useState([]);

  // Effect runs once (or when username changes) to set up socket listeners
  useEffect(() => {
    // Store username in localStorage
    localStorage.setItem('username', username);
    // Join the 'main' chat room on the server
    socket.emit("join_room", "main");

    // Listen for incoming messages from server
    socket.on("message_received", (data) => {
      // Append new message to list
      setlist(prev => [...prev, data]);
      console.log(data);
    });

    // Clean up the listener on unmount
    return () => socket.off("message_received");
  }, [username]);

  // Handler for input changes: update message state
  const Messagechange = event => {
    setMessage(event.target.value);
  }

  // Function to send the message to the server
  const sent = async () => {
    // Only send if message is not empty
    if (message !== "") {
      const messDatat = {
        username: username,
        message: message,
        room: "main"
      };
      // Emit the 'sentMessage' event with message data
      await socket.emit("sentMessage", messDatat);
      // Clear the input field
      setMessage("");
    }
  }

  // Render the chat UI
  return (
    <div>
      {/* Greeting with username */}
      <h1>Welcome to messaging, {username}</h1>

      <div>
        <p>Live Chat</p>
        {/* Display each message in the list */}
        {messagelist.map((messageCont, index) => (
          <div key={index}>
            <strong>{messageCont.username}</strong>
            <p>{messageCont.message}</p>
            {/* Show timestamp (same for all, based on initial render) */}
            <p>{time}</p>
          </div>
        ))}
      </div>

      {/* Message input form */}
      <form>
        <label>Enter Message</label>
        <input
          type="text"
          required
          value={message}
          onChange={Messagechange}
        />
        {/* Button triggers send function */}
        <button type="button" onClick={sent}>&#9658;</button>
      </form>
    </div>
  );
}

// Export the component for use in the app
export default Usermessage;
