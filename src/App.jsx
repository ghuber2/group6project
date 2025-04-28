import { useState } from 'react'
import './App.css'
import Sidebar from './components/MainSidebar'
import Background from './components/Background'
import Post from './components/Post'

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
            </body>
        </>
    )
}

export default App
