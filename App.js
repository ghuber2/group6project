import logo from './logo.svg';
//import './App.css';
import React, { useState } from 'react';


function ImageUse({ imageUrl }) {
  return <img src={imageUrl} alt="broken" style={{ width: '200px' }} />;
}


function LoginPage({login}){
  const[user, setUser]= useState('');
    const[pass, setPass]= useState('');
    const click = async (e) => {
      e.preventDefault();
    
      const res = await fetch('http://localhost:3000/login', {
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
      alert(`Signup successful:\n${JSON.stringify(data, null, 2)}`);
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
function Signup({signup}){

  const[user, setUser]= useState('');
    const[pass, setPass]= useState('');
    const[email, setEmail]= useState('');
    const click = async (e) => {
      e.preventDefault();
    
      const res = await fetch('http://localhost:3000/add-user', {
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

function HobbyList({ hobbies }) {

  
    const[user, setUser]= useState('');
    const[pass, setPass]= useState('');
    const click =() =>{
      alert(`Username: ${user}\nPassword: ${pass}`);
    }
    const Userchange = event =>{
      setUser(event.target.value);
    }
    const Passchange = event =>{
      setPass(event.target.value);
    }
  
  return (
    <div>
      <h2>my hobbies:</h2>
      <ul>
        {hobbies.map((hobby, i) => <li key={i}>{hobby}</li>)}
      </ul>
      
    </div>
  );
}



function App({user}) {
  //const element= <h1>Welcome to skibidi toilet land</h1>;
  
  return (
    <div className="App">
      <header className="App-header">
       
        <p>
          <h1>{user.name}</h1>
          <ImageUse imageUrl={user.imgUrl}/>  
          <HobbyList hobbies={user.hobbyList}/>
          <LoginPage />
          <Signup/>
        </p>
        
        <a
          
        >
        
        </a>
      </header>
    </div>
  );
}

export default App;
