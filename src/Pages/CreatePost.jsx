// CreatePost.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import Background from '../components/Background';
import Sidebar from '../components/MainSidebar';
import Modal from '../components/Modal';
import MapboxMap from '../components/Map';

// init socket
const socket = io('https://group6project.onrender.com');

export default function CreatePost() {
  const [useBuilding, setUseBuilding] = useState(true);
  const [formData, setFormData]       = useState({});
  const [coords, setCoords]           = useState(null);
  const [showModal, setShowModal]     = useState(false);
  const [postData, setPostData]       = useState(null);

  const location = useLocation();
  const username = location.state?.username
    || localStorage.getItem('username')
    || 'Guest';

  const buildingCoords = {
    YR: { lat: 39.3908, long: -76.6061 },
    SC: { lat: 39.3914, long: -76.6060 },
    LA: { lat: 39.3950, long: -76.6091 }
  };

  useEffect(() => {
    localStorage.setItem('username', username);
    socket.emit('join_room', 'main');
    socket.on('message_received', incoming => {
      console.log('New post via socket:', incoming);
    });
    return () => socket.off('message_received');
  }, [username]);

  const handleBuildingChange = e => {
    const b = e.target.value;
    setFormData({ ...formData, building: b });
    if (buildingCoords[b]) setCoords(buildingCoords[b]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { building, room, title, description, date, time } = formData;

    let desc = description;
    if (useBuilding && building && room) {
      desc += ` (Located in ${building}, Room ${room})`;
    }

    const final = useBuilding && buildingCoords[building]
      ? buildingCoords[building]
      : coords;

    const payload = {
      username,
      title,
      description: desc,
      date,
      time,
      lat: final?.lat,
      long: final?.long
    };

    // socket emit
    socket.emit('sentMessage', { room: 'main', payload });

    // REST call
    try {
      const res = await fetch('https://group6project.onrender.com/create-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const saved = await res.json();
      console.log('Saved:', saved);
    } catch (err) {
      console.error('Failed to save post:', err);
    }

    setPostData(payload);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({});
    setCoords(null);
  };

  return (
    <>
      <Background />
      <Sidebar />
      <div style={{ padding: 20 }}>
        <form onSubmit={handleSubmit} className="create-post-form">
          <h2>Create New Post</h2>
          <input
            placeholder="Title"
            required
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          /><br/>
          <textarea
            placeholder="Description"
            required
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          /><br/>
          <input
            type="date"
            required
            onChange={e => setFormData({ ...formData, date: e.target.value })}
          />
          <input
            type="time"
            required
            onChange={e => setFormData({ ...formData, time: e.target.value })}
          /><br/>

          <label>Academic Building?</label>
          <select onChange={e => setUseBuilding(e.target.value === 'yes')}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select><br/>

          {useBuilding ? (
            <>
              <label>Choose Building:</label>
              <select required onChange={handleBuildingChange}>
                <option value="">-- Select --</option>
                <option value="YR">YR</option>
                <option value="SC">SC</option>
                <option value="LA">LA</option>
              </select><br/>
              <input
                placeholder="Room Number"
                required
                onChange={e => setFormData({ ...formData, room: e.target.value })}
              />
            </>
          ) : (
            <MapboxMap setCoordinates={(long, lat) => setCoords({ long, lat })} />
          )}<br/>

          <button type="submit">Confirm Post</button>
        </form>

        {showModal && (
          <Modal post={postData} onClose={handleClose} />
        )}
      </div>
    </>
  );
}
