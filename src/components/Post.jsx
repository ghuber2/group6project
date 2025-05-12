// src/components/Post.jsx
import React from 'react';

function Post({ post }) {
  const { title, description, date, time, lat, lng, username } = post;
  return (
    <div className="post-header" style={{ marginBottom: 16 }}>
      <div className="avatar" style={{
          width: 40, height: 40, borderRadius: '50%',
          background: '#ddd', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontWeight: 700
        }}>
        {username.charAt(0).toUpperCase()}
      </div>
      <div className="post-info" style={{ marginLeft: 12 }}>
        <strong>{title}</strong><br/>
        {description}<br/>
        <small>
          {date} @ {time}<br/>
          Location: {lat.toFixed(4)}, {lng.toFixed(4)}
        </small>
      </div>
    </div>
  );
}

export default Post;
