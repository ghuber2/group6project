import SearchIcon from "../assets/search-bar-icon.png";
function Searchbar() {
    return (
        <div className="search-bar-container">
            <img src={SearchIcon} id="search-icon" alt="Search" />
            <input id="search-box" placeholder="Search" />

        </div>
    )
}

export default Searchbar;