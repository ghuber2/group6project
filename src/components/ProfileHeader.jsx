import React, { useState, useEffect } from 'react';
import Post from './Post';

export default function ProfileHeader() {
  const [posts, setPosts] = useState([]);
  const username = localStorage.getItem('username') || 'Guest';

  useEffect(() => {
    async function loadMyPosts() {
      try {
        const res = await fetch('https://group6project.onrender.com/create-post');
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

  const handleDelete = async (id) => {
    const confirm = window.confirm('Delete this post?');
    if (!confirm) return;
    try {
      const res = await fetch(`https://group6project.onrender.com/create-post/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setPosts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  return (
    <>
      <header className="profile" style={{ padding: 20, borderBottom: '2px solid black' }}>
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
            <p>Logged in as <strong>{username}</strong></p>
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
          boxSizing: 'border-box',
        }}
      >
        <h3 className="messages-sub-header">My Posts</h3>
        {posts.length === 0 ? (
          <p className='messages-sub-header'>You haven't made any posts yet.</p>
        ) : (
          posts.map((post, idx) => (
            <div key={post._id || idx} style={{ position: 'relative', marginBottom: 16 }}>
              <Post post={post} />
              <button
                onClick={() => handleDelete(post._id)}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  color: '#e00'
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
