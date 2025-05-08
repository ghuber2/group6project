// import Filter from "../components/Filter";
import Sidebar from "../components/MainSidebar";
// import Post from "../components/Post";
// import Background from "../components/Background";

// function Home() {
//     return (
//         <>
//             <Background />
//             <Sidebar />
//             <div class="post-filter">
//                 <div class="posts">
//                     <Post />
//                     <Post />
//                     <Post />
//                     <Post />
//                 </div>
//                 <Filter />
//             </div>

//         </>
//     )
// }

// export default Home;

import React, { useState } from 'react';
import MapModal from '../components/MapModal';

//dummy hard coded posts to be replaced by database information
const dummyPosts = [
    {
        title: "Study Group",
        description: "Join us for CS study session!",
        date: "2025-05-05",
        time: "18:00",
        lat: 39.3941,
        lng: -76.6099
    },
    {
        title: "Basketball Meetup",
        description: "Pickup game at the gym! (Located in YR, Room 205)",
        date: "2025-05-06",
        time: "16:00",
        lat: 39.3908,
        lng: -76.6061
    },
    {
        title: "Open Mic Night",
        description: "Come share your talent at the student union. (Located in LA, Room 2238)",
        date: "2025-05-07",
        time: "19:30",
        lat: 39.3950,
        lng: -76.6091
    },
    {
        title: "Chess Club Meetup",
        description: "Friendly games and strategy discussion.",
        date: "2025-05-08",
        time: "15:00",
        lat: 39.3932,
        lng: -76.6100
    },
    {
        title: "Career Fair Info Session",
        description: "Tips on how to stand out at next week’s career fair.",
        date: "2025-05-09",
        time: "13:00",
        lat: 39.3920,
        lng: -76.6075
    },
    {
        title: "Hackathon Kickoff",
        description: "Intro event for the 48-hour hackathon challenge.",
        date: "2025-05-10",
        time: "09:00",
        lat: 39.3971,
        lng: -76.6060
    },
    {
        title: "Sunset Yoga",
        description: "Relaxing outdoor yoga on the quad.",
        date: "2025-05-11",
        time: "18:30",
        lat: 39.3958,
        lng: -76.6112
    },
    {
        title: "Film Club Screening",
        description: "This week's feature: 'Good Will Hunting'",
        date: "2025-05-12",
        time: "20:00",
        lat: 39.3960,
        lng: -76.6090
    }
];

const Home = () => {
    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <>
            <Sidebar />
            <div class="main-posts">
                <h2>Campus Posts</h2>
                <div
                    style={{
                        maxHeight: '800px', // Set a fixed height
                        overflowY: 'auto',  // Enable vertical scrolling
                        paddingRight: 8,    // Optional: avoids content getting cut by scrollbar
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        padding: 12,
                        marginBottom: 20,

                    }}>
                    {dummyPosts.map((post, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedPost(post)}
                            style={{
                                background: 'white',
                                padding: 16,
                                borderRadius: 12,
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                                marginBottom: 20,
                                fontFamily: "Montserrat, sans-serif",
                                fontWeight: 700,
                                fontStyle: "normal"
                            }}
                        >
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                            <p>{post.date} @ {post.time}</p>
                        </div>
                    ))}

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
};

export default Home;