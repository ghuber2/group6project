// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from "../components/MainSidebar";
import MapModal from '../components/MapModal';

export default function Home() {
  const [posts, setPosts]               = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // Load posts from the database
    async function loadPosts() {
      try {
        const res = await fetch('https://group6project.onrender.com/create-post');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Convert each record: string coords → numbers, long → lng
        const formatted = data.map(p => ({
          title:       p.title,
          description: p.description,
          date:        p.date,
          time:        p.time,
          lat:         parseFloat(p.lat),
          lng:         parseFloat(p.long)
        }));

        setPosts(formatted);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    }

    loadPosts();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="main-posts">
        <h2>Campus Posts</h2>
        <div
          style={{
            maxHeight: '800px',
            overflowY: 'auto',
            paddingRight: 8,
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 12,
            marginBottom: 20
          }}
        >
          {posts.length === 0
            ? <p>Loading posts…</p>
            : posts.map((post, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPost(post)}
                  style={{
                    background: 'white',
                    padding: 16,
                    borderRadius: 12,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    marginBottom: 20,
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700
                  }}
                >
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <p>{post.date} @ {post.time}</p>
                </div>
              ))
          }

          {selectedPost && (
            <MapModal
              post={selectedPost}
              onClose={() => setSelectedPost(null)}
            />
          )}
        </div>
      </div>
    </>
  );
}
