import Post from "./Post";

function ProfileHeader() {
    return (
        <>
            <header class="profile">
                <div class="profile-container">
                    <div class="profile-picture">TU</div>
                    <div class="profile-details">
                        <h2>My Profile</h2>
                        <p>
                            This is my profile <br></br><br></br>
                            My hobbies include:
                            <ul>
                                <li>Riding bikes</li>
                                <li>Crashing out</li>
                                <li>Long walks</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </header>
            <div class="posts">
                <div class="profile-posts">
                    <h3>Recent posts</h3>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>

        </>
    )
}

export default ProfileHeader;