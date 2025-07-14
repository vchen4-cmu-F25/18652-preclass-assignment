const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv');

env.config();

const app = express();
app.use(express.json());
app.use(cors());

// set up MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);


app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const olduser = await User.findOne({ username });
    if (olduser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error when registering user: ' + error.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
      res.json({ token, username: user.username });
    } else {
      res.status(401).json({ message: 'Incorrect username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error when logging in: ' + error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});