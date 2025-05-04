const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./model/User_date');


app.use(express.json());

const mongoIRL = 'mongodb+srv://flyingtoilet97:yCizzlNpN9PElygX@cluster0.irgu22p.mongodb.net/Cluster0'; 

mongoose.connect(mongoIRL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((err) => console.log(err));


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
    res.send('Login successful');
  } catch (err) {
    res.status(500).send('Server error');
  }
});