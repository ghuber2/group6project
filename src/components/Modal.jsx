const Modal = ({ post, onClose }) => (
    <div style={{
        position: 'fixed', top: '20%', left: '50%', background: '#fff', padding: 20, border: '1px solid gray', borderRadius: 8
    }}>
        {console.log("Post in modal:", post)}

        <h3>Post Created!</h3>
        <p><strong>Title:</strong> {post.title}</p>
        <p><strong>Description:</strong> {post.description}</p>

        {post.lat && post.lng && (
            <p><strong>Location:</strong> ({post.lng}, {post.lat})</p>
        )}

        <p><strong>Date:</strong> {post.date}</p>
        <p><strong>Time:</strong> {post.time}</p>


        <button onClick={onClose}>Close</button>
    </div>
);

export default Modal;
