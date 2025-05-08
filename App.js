import logo from './logo.svg';
//import './App.css';
import React, { useState } from 'react';
import io from "socket.io-client";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Usermessage from './pages/message'
import Signup from './pages/signup'
import LoginPage from './pages/loginpage'
import MessagePost from './pages/post';











function App({user}) {
  //const element= <h1>Welcome to skibidi toilet land</h1>;
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/messages" element={<Usermessage/>}/>
        <Route path="/post" element={<MessagePost/>}/>

      </Routes>
    </Router>
  );
}

export default App;
