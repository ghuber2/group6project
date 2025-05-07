// import Sidebar from "../components/MainSidebar";
// import Background from "../components/Background";

// function CreatePost() {
//     return (
//         <>
//             <Background />
//             <Sidebar />
//             <h1>Create Post</h1>
//         </>
//     )
// }

// export default CreatePost;

// CreatePost.js
import React, { useState } from 'react';
import MapboxMap from '../components/Map';
import Modal from '../components/Modal';

const buildingCoords = {
    YR: { lng: -76.6061, lat: 39.3908 },
    SC: { lng: -76.6060, lat: 39.3914 },
    LA: { lng: -76.6091, lat: 39.3950 },
};

const CreatePost = () => {
    const [useBuilding, setUseBuilding] = useState(true);
    const [formData, setFormData] = useState({});
    const [coords, setCoords] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [postData, setPostData] = useState(null);


    const handleBuildingChange = (e) => {
        const building = e.target.value;
        setFormData({ ...formData, building });
        if (buildingCoords[building]) {
            setCoords(buildingCoords[building]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const building = formData.building;
        const room = formData.room;

        let updatedDescription = formData.description;

        if (useBuilding && building && room) {
            updatedDescription += ` (Located in ${building}, Room ${room})`;
        }

        const finalCoords = useBuilding && buildingCoords[building]
            ? buildingCoords[building]
            : coords;

        const post = {
            ...formData,
            description: updatedDescription,
            ...(finalCoords || {}),
        };

        console.log("New Post:", post);
        setPostData(post);
        setShowModal(true);
    };



    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({});
        setCoords(null);
        setPostData(null);
    };

    return (
        <div>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Post Name" required onChange={e => setFormData({ ...formData, title: e.target.value })} /><br />
                <textarea placeholder="Description" required onChange={e => setFormData({ ...formData, description: e.target.value })} /><br />
                <input type="date" required onChange={e => setFormData({ ...formData, date: e.target.value })} />
                <input type="time" required onChange={e => setFormData({ ...formData, time: e.target.value })} /><br />

                <label>Academic Building?</label>
                <select onChange={e => setUseBuilding(e.target.value === "yes")}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select><br />

                {useBuilding ? (
                    <>
                        <label>Choose Building:</label>
                        <select required onChange={handleBuildingChange}>
                            <option value="">-- Select --</option>
                            <option value="YR">YR</option>
                            <option value="SC">SC</option>
                            <option value="LA">LA</option>
                        </select><br />
                        <input placeholder="Room Number" required onChange={e => setFormData({ ...formData, room: e.target.value })} />
                    </>
                ) : (
                    <MapboxMap setCoordinates={(lng, lat) => setCoords({ lng, lat })} />
                )}
                <br />
                <button type="submit">Confirm Post</button>
            </form>

            {showModal && postData && <Modal post={postData} onClose={handleCloseModal} />}
        </div>
    );
};

export default CreatePost;