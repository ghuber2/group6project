
import React, { useState } from 'react';
import io from "socket.io-client";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function Signup({signup}){

    const[user, setUser]= useState('');
      const[pass, setPass]= useState('');
      const[email, setEmail]= useState('');
      const click = async (e) => {
        e.preventDefault();
      //this too
        const res = await fetch('http://192.168.1.153:3001/add-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: user,
            email: email,
            password: pass
          })
        });
      
        const data = await res.json();
        alert(`Signup successful:\n${JSON.stringify(data, null, 2)}`);
      };
      const Userchange = event =>{
        setUser(event.target.value);
      }
      const Passchange = event =>{
        setPass(event.target.value);
      }
      const Emailchange = event =>{
        setEmail(event.target.value);
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
          <label>Enter email</label>
  
          <input onChange={Emailchange}
          type="text"
          required
          value={email}
          />
          <button type="submit" onClick={click}>click</button>
  
        </form>
      </div>
    )
  }

  export default Signup;