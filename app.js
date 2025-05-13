const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user_data');


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


app.get('/add-user', (req, res) => {
  const user = new User({
    username: 'Anish',
    email: 'something@gmail.com',
    password: 'jorgorwell'
  });

  user.save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});


app.get('/login', async (req, res) => {
  const username="skibidi";
  const password="6789998212"

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send('Invalid username');
    }

    if (user.password !== password) {
      return res.status(401).send('Invalid password');
    }

    res.send('Login successful');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

  
 
