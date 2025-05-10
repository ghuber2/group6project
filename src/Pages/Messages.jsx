import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import Background from "../components/Background";
import Sidebar from "../components/MainSidebar";

// Establish a socket connection to the server
const socket = io.connect('https://group6project.onrender.com/');

// Combined Messages component with integrated UI layout
export default function Messages() {
  // Get current time for timestamp display
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const mins = date.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${mins}`;

  // State for the current message input
  const [message, setMessage] = useState('');
  // Get location for username state
  const location = useLocation();
  const username =
    location.state?.username || localStorage.getItem('username') || 'Guest';
  // State for list of received messages
  const [messageList, setMessageList] = useState([]);

  // Setup socket listeners when component mounts or username changes
  useEffect(() => {
    localStorage.setItem('username', username);
    socket.emit('join_room', 'main');
    socket.on('message_received', (data) => {
      setMessageList((prev) => [...prev, data]);
    });
    return () => socket.off('message_received');
  }, [username]);

  // Input change handler
  const handleChange = (e) => setMessage(e.target.value);

  // Send message to server
  const sendMessage = async () => {
    if (message.trim()) {
      await socket.emit('sentMessage', { username, message, room: 'main' });
      setMessage('');
    }
  };

  return (
    <>
      <Background />
      <Sidebar />
      <div style={{ padding: '20px' }}>
        <h1>Messages</h1>
        <h2>Welcome, {username}</h2>
        <section>
          <p>Live Chat</p>
          {messageList.map((msg, idx) => (
            <div key={idx}>
              <strong>{msg.username}</strong>
              <p>{msg.message}</p>
              <small>{time}</small>
            </div>
          ))}
        </section>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="messageInput">Enter Message</label>
          <input
            id="messageInput"
            type="text"
            required
            value={message}
            onChange={handleChange}
          />
          <button type="button" onClick={sendMessage}>&#9658;</button>
        </form>
      </div>
    </>
  );
}
