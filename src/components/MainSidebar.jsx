import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <>
            <div class="sidebar">
                <Link to="/"><h1>Plenty O' Friends</h1></Link>
                <nav>
                    <Link to="/"><span class="square"></span>Home</Link>
                    <a href="#"><span class="square"></span>Search</a>
                    <Link to="/Messages"><span class="square"></span>Messages</Link>
                    <a href="#"><span class="square"></span>Notifications</a>
                    <Link to="/CreatePost"><span class="square"></span>Create Post</Link>
                    <Link to="/MyProfile"><span class="square"></span>My Profile</Link>
                </nav>
            </div>
        </>
    )
}

export default Sidebar;