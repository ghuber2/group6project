const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors()); 
app.use(express.json());
const mongoIRL = 'mongodb+srv://flyingtoilet97:yCizzlNpN9PElygX@cluster0.irgu22p.mongodb.net/Cluster0'; 
const User = require('./model/User_date');
const post = require('./model/post_info');

const server = http.createServer(app); 


const io = new Server(server, {
  cors: {
    origin: "*", //eventually replace this with localhost 
    methods: ["GET", "POST"],
    credentials: true
  }
});


io.on("connection", (socket) => {
  console.log("a user connected: " + socket.id);

  socket.on("join_room", (data)=>{
    socket.join(data);
    console.log('someone has join')
  })

  socket.on("chat_message", (msg) => {
    //console.log(msg);
    io.emit("chat message", msg);
  });

  socket.on("sentMessage", (data) =>{
      io.to(data.room).emit("message_received",data);
  })

 

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


mongoose.connect(mongoIRL)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(3001, '0.0.0.0', () => {
      console.log('Server running on port 3001');
    });
  })
  .catch((err) => console.log(err));

console.log("whatsup")
app.post('/add-user', (req, res) => {

  const {username, password, email}=req.body;
  const user = new User({
    username: username,
    email: email,
    password: password
  });

  user.save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.post('/create-post', (req, res)=>{
  const {lat, long, description, title,time,date,username}= req.body;
  const postData= new post({
    lat: lat,
    long: long,
    description: description,
    title: title,
    time:time,
    date:date,
    username: username
  })
  postData.save()
    .then((result)=> res.send(result))
    .catch((err)=> console.log(err));
})


app.post('/login', async (req, res) => {
  const {username, password}=req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log('invalid user');
      return res.status(401).send('Invalid username');
      
    }

    if (user.password !== password) {
      console.log('invalid pass');
      return res.status(401).send('Invalid password');
    }
    console.log('Successful');
    res.json({username:user.username})
   
  } catch (err) {
    res.status(500).send('Server error');
  }
});