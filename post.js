import React, { useState } from 'react';
import io from "socket.io-client";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MessagePost() {
  const location= useLocation();
  const date=new Date();
  let hours=date.getHours();
  let mins=date.getMinutes();
  let dateGet=("0" + date.getDate()).slice(-2);
  let year=date.getFullYear();

  let month= ("0" + (date.getMonth() + 1)).slice(-2);
  let time = `${hours}:${mins}`;
  let calendar = `${month}/${dateGet}/${year}`;
  const username = location.state?.username || localStorage.getItem('username') || 'Guest';
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [late, setLat] = useState('');
  const [long, setLong] = useState('');
  localStorage.setItem('username',username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //this too
    const res = await fetch('http://192.168.1.153:3001/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: late,
        long: long,
        description: desc,
        title: title,
        time: time,
        date: calendar,
        username: username
        
      })
    });

    const data = await res.json();
    alert(`Post created:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <div>
      <p>{username}</p>
      <form onSubmit={handleSubmit}>
        <label>Enter Title</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Enter Description</label>
        <input type="text" required value={desc} onChange={(e) => setDesc(e.target.value)} />

        <label>Enter Latitude</label>
        <input type="text" required value={late} onChange={(e) => setLat(e.target.value)} />

        <label>Enter Longitude</label>
        <input type="text" required value={long} onChange={(e) => setLong(e.target.value)} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


export default MessagePost;