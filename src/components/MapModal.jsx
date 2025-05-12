import React from 'react';
import PostMap from './PostMap';

const MapModal = ({ post, onClose }) => {
    return (
        <div style={{
            position: 'fixed', top: '10%', left: '20%', right: '20%',
            background: '#fff', padding: 20, border: '1px solid #ccc',
            borderRadius: 8, zIndex: 1000
        }}>
            <h3 className="map-post-info">{post.title}</h3>
            <p className="map-post-info">{post.description}</p>
            <p className="map-post-info">{post.date} @ {post.time}</p>
            <div style={{ height: '500px', width: '100%', marginTop: 10 }}>
                <PostMap lat={post.lat} lng={post.lng} className="map-modal-map"/>
            </div>
            <button id="map-close-button"style={{ marginTop: 10 }} onClick={onClose}>Close</button>
        </div>
    );
};

export default MapModal;
