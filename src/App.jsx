import { useState } from 'react'
import './App.css'
import Sidebar from './components/MainSidebar'
import Background from './components/Background'
import Post from './components/Post'
import Filter from './components/Filter'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import CreatePost from './Pages/CreatePost'
import MyProfile from './Pages/MyProfile'
import Messages from './Pages/Messages'
import Auth from './Pages/Auth'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Auth />} />
                <Route path="/CreatePost" element={<CreatePost />} />
                <Route path="/MyProfile" element={<MyProfile />} />
                <Route path="/Messages" element={<Messages />} />
            </Routes>
        </Router>
    )
}

export default App
