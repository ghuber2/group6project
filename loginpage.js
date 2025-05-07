
//import './App.css';
import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';



const socket= io.connect("http://localhost:3001");

function LoginPage({login}){
    const[user, setUser]= useState('');
      const[pass, setPass]= useState('');
      const navigate=useNavigate('');
      const click = async (e) => {
        e.preventDefault();
      
        const res = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: user,
            password: pass
          })
        });
      
        const data = await res.json();
        navigate('/messages', { state: { username: data.username } });
        alert(`Login successful:\n${JSON.stringify(data, null, 2)}`);
      };
      const Userchange = event =>{
        setUser(event.target.value);
      }
      const Passchange = event =>{
        setPass(event.target.value);
      }
      
     
    return(
      <div>
        <form onSubmit={click}>
          <label>Enter Username</label>
          <input onChange={Userchange}
         
          type="text"
          required
          value={user}
          />
          <label>Enter Password</label>
  
          <input onChange={Passchange}
          type="text"
          required
          value={pass}
          />
        
          <button type="submit" onClick={click}>click</button>
  
        </form>
      </div>
    )
  }

  export default LoginPage;