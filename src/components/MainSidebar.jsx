import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
function Sidebar() {
    return (
        <>
            <div class="sidebar">
                <Link to="/" id="page-title">Plenty O' Friends</Link>
                <nav class="navbar">
                    <Searchbar />
                    <Link to="/"><span class="square"></span>Home</Link>
                    <Link to="/Messages"><span class="square"></span>Messages</Link>
                    <Link to="/CreatePost"><span class="square"></span>Create Post</Link>
                    <Link to="/MyProfile"><span class="square"></span>My Profile</Link>
                </nav>
            </div>
        </>
    )
}

export default Sidebar;