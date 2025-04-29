import Filter from "../components/Filter";
import Sidebar from "../components/MainSidebar";
import Post from "../components/Post";
import Background from "../components/Background";

function HomePage() {
    return (
        <>
            <Background />
            <Sidebar />
            <Post />
            <Post />
            <Filter />
        </>
    )
}

export default HomePage;