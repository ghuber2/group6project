import Filter from "../components/Filter";
import Sidebar from "../components/MainSidebar";
import Post from "../components/Post";
import Background from "../components/Background";

function HomePage() {
    return (
        <>
            <Background />
            <Sidebar />
            <div class="post-filter">
                <div>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
                <Filter />
            </div>

        </>
    )
}

export default HomePage;