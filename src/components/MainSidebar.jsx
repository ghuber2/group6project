
function Sidebar() {
    return (
        <>
            <div class="sidebar">
                <a href="#"><h1>Plenty O' Friends</h1></a>
                <nav>
                    <a href="#" class="current"><span class="square"></span>Home</a>
                    <a href="#"><span class="square"></span>Search</a>
                    <a href="#"><span class="square"></span>Messages</a>
                    <a href="#"><span class="square"></span>Notifications</a>
                    <a href="#"><span class="square"></span>Create Post</a>
                    <a href="#"><span class="square"></span>My Profile</a>
                </nav>
            </div>
        </>
    )
}

export default Sidebar;