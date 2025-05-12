import React, { useState, useEffect } from 'react';
import Post from './Post';

export default function ProfileHeader() {
  const [posts, setPosts] = useState([]);
  const username = localStorage.getItem('username') || 'Guest';

  useEffect(() => {
    async function loadMyPosts() {
      try {
        const res = await fetch('http://localhost:3001/create-post');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const all = await res.json();

        const mine = all
          .filter(p => p.username === username)
          .map(p => ({
            ...p,
            lat: parseFloat(p.lat),
            lng: parseFloat(p.long)
          }));

        setPosts(mine);
      } catch (err) {
        console.error('Failed to load my posts:', err);
      }
    }
    loadMyPosts();
  }, [username]);

  return (
    <>
      <header className="profile" style={{ padding: 20, borderBottom: '1px solid #ccc' }}>
        <div className="profile-container" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="profile-picture" style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: '#ddd',
            fontSize: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16
          }}>
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="profile-details">
            <h2>My Profile</h2>
            <h3>Logged in as <strong>{username}</strong></h3>
          </div>
        </div>
      </header>

      <div
        className="posts"
        style={{
          padding: 20,
          marginLeft: 300,
          margin: '0 auto',
          maxWidth: 700,
          boxSizing: 'border-box'
        }}
      >
        <h3>My Posts</h3>
        {posts.length === 0 ? (
          <p>You haven’t made any posts yet.</p>
        ) : (
          posts.map((post, i) => (
            <Post key={post._id || i} post={post} />
          ))
        )}
      </div>
    </>
  );
}
