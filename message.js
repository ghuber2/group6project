import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import React, { useState,useEffect } from 'react';

import io from "socket.io-client";
import { clear } from '@testing-library/user-event/dist/clear';
    //this too
const socket= io.connect("http://192.168.1.153:3001");
function Usermessage(){
  const date=new Date();
  let hours=date.getHours();
  let mins=date.getMinutes();
  let time = `${hours}:${mins}`;
  let dateGet=date.getDate();
  let month= date.getMonth();
  
    const [message, setMessage]=useState('');
    const location= useLocation();
    const username = location.state?.username || localStorage.getItem('username') || 'Guest';
    const [messagelist, setlist]=useState([]);
    

    useEffect(() => {
      localStorage.setItem('username', username);
      socket.emit("join_room", "main");
    
      socket.on("message_received", (data) => {
        setlist(prev => [...prev, data]);
        console.log(data);
      });
    
      return () => socket.off("message_received");
    }, [username]);
    
    
    const Messagechange = event =>{
        setMessage(event.target.value);
      }
    const sent = async () =>{
        if (message !==""){
            const messDatat ={
                username: username,
                message: message,
                room: "main"
            }
            await socket.emit("sentMessage",messDatat);
            setMessage("");
        }
    }
   
    
    return(
      <div>
        <h1> welcome to messaging {username}</h1>
        
        <div>
            <p>Live Chat</p>
            {messagelist.map((messageCont, index) => (
              <div key={index}>
                <strong>{messageCont.username}</strong>
                <p>{messageCont.message}</p>
                <p>{time}</p>
              </div>
            ))}

        </div>
        <form>
          <label>Enter Message </label>
          <input onChange={Messagechange}
          type="text"
          required
          
          value={message}
          />
          <button onClick={sent}>&#9658;</button>
  
          
        </form>
      </div>
    )
  }

  export default Usermessage;