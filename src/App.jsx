import { useState } from 'react'
import './App.css'
import Sidebar from './components/MainSidebar'
import Background from './components/Background'
import Post from './components/Post'
import Filter from './components/Filter'

function App() {
    return (
        <>
            <body>
                <Background />
                <Sidebar />
                <Post />
                <Post />
                <Post />
                <Post />
                <Filter />
            </body>
        </>
    )
}

export default App
