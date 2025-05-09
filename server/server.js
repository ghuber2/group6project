// server.js

// Import necessary modules
const express = require('express');            // Web framework for handling HTTP requests
const mongoose = require('mongoose');           // MongoDB ODM for schema modeling
const cors = require('cors');                   // Middleware to enable Cross-Origin Resource Sharing
const http = require('http');                   // Node's HTTP module to create the server
const { Server } = require('socket.io');        // Socket.IO for real-time websockets

// Initialize Express app
const app = express();
// Enable CORS to allow requests from any origin (you can restrict this in production)
app.use(cors());
// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// MongoDB connection string (replace credentials and DB name as needed)
const mongoIRL = 'mongodb://localhost:27017/testDB';

// Import Mongoose models for Users and Posts
const User = require('./model/User_date');
const post = require('./model/post_info');

// Create an HTTP server from the Express app
const server = http.createServer(app);

// Initialize a new Socket.IO server, attached to our HTTP server
// Configure CORS on sockets: allow any origin, GET/POST methods
const io = new Server(server, {
  cors: {
    origin: "*", // TODO: replace with specific origin like 'http://localhost:3000'
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Handle new socket connections
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  // Handle joining a room (chat channel) named by `data`
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log('User joined room:', data);
  });

  // Handle generic chat messages: broadcast to all connected clients
  socket.on("chat_message", (msg) => {
    io.emit("chat message", msg);
  });

  // Handle structured messages: send to a specific room
  socket.on("sentMessage", (data) => {
    io.to(data.room).emit("message_received", data);
  });

  // Log disconnections
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Connect to MongoDB via Mongoose
mongoose.connect(mongoIRL)
  .then(() => {
    console.log('MongoDB connected');
    // Start the HTTP + Socket.IO server once DB is connected
    server.listen(3001, '0.0.0.0', () => {
      console.log('Server running on port 3001');
    });
  })
  .catch((err) => console.log('MongoDB connection error:', err));

// Quick log to show server file has loaded
console.log("Server script loaded");

// Route to add a new user to the database
app.post('/add-user', (req, res) => {
  // Destructure user info from request body
  const { username, password, email } = req.body;
  // Create a new User document
  const user = new User({
    username: username,
    email: email,
    password: password
  });

  // Save to MongoDB and respond with the created document
  user.save()
    .then((result) => res.send(result))
    .catch((err) => console.log('Error saving user:', err));
});

// Route to create a new post (with geolocation and metadata)
app.post('/create-post', (req, res) => {
  // Destructure post data from request body
  const { lat, long, description, title, time, date, username } = req.body;
  // Create a new Post document
  const postData = new post({
    lat: lat,
    long: long,
    description: description,
    title: title,
    time: time,
    date: date,
    username: username
  });

  // Save post to MongoDB and respond with the created document
  postData.save()
    .then((result) => res.send(result))
    .catch((err) => console.log('Error saving post:', err));
});

// Route to authenticate a user (login)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Look up the user by username
    const user = await User.findOne({ username });

    // If user not found, send 401 Unauthorized
    if (!user) {
      console.log('Invalid username');
      return res.status(401).send('Invalid username');
    }

    // Check if password matches (plaintext comparison; consider hashing in production)
    if (user.password !== password) {
      console.log('Invalid password');
      return res.status(401).send('Invalid password');
    }

    // On success, return the username in JSON (you could include a token here)
    console.log('Login successful for', username);
    res.json({ username: user.username });
  } catch (err) {
    console.log('Login error:', err);
    res.status(500).send('Server error');
  }
});
