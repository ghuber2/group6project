import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import React, { useState,useEffect } from 'react';

import io from "socket.io-client";
import { clear } from '@testing-library/user-event/dist/clear';
const socket= io.connect("http://localhost:3001");
function Usermessage(){

    const [mesage, setMessage]=useState('');
    const location= useLocation();
    const username = location.state?.username || localStorage.getItem('username') || 'Guest';
    const [chat, setChat] = useState([]);
    const [messagelist, setlist]=useState([]);
    localStorage.setItem('username',username);

    useEffect(() => {
        localStorage.setItem('username', username);
        socket.emit("join_room", "main");
    
        socket.on("message_received", (data) => {
          setChat(prev => [...prev, data]);
        });
    
        return () => socket.off("message_received");
      }, [username]);
    
    
    const Messagechange = event =>{
        setMessage(event.target.value);
      }
    const sent = async () =>{
        if (mesage !==""){
            const messDatat ={
                username: username,
                message: mesage,
                room: "main"
            }
            await socket.emit("sentMessage",messDatat);
            setMessage("");
        }
    }
    useEffect(()=>{
        socket.on("message_received", (data) =>{
            setlist((list)=> [...list,data]);
            console.log(data);
        })
      }, [socket]);
    console.log(username);
    
    return(
      <div>
        <h1> welcome to messaging {username}</h1>
        <div>
            <p>Live Chat</p>
            {messagelist.map((messageCont)=>{
                return <h1>{messageCont.message}</h1>
            })}
        </div>
        <form>
          <label>Enter Message </label>
          <input onChange={Messagechange}
          type="text"
          required
          
          value={mesage}
          />
          <button onClick={sent}>&#9658;</button>
  
          
        </form>
      </div>
    )
  }

  export default Usermessage;