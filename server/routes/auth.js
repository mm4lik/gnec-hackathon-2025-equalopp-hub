import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/database.js'; 

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

// Middleware to verify token
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing token' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, gender, country } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      region: country, // store as region internally if your schema uses 'region'
      goal: 'set a goal',
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Registration failed', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', user: { name: user.name, email: user.email }, access_token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// Update goal (requires authentication)
router.post('/update-goal', authenticate, async (req, res) => {
  const { goal } = req.body;
  if (!goal) return res.status(400).json({ message: 'Goal is required' });

  try {
    await User.findByIdAndUpdate(req.user.id, { goal });
    res.json({ message: 'Goal updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update goal', error: err.message });
  }
});

// Route to get the goal of a user
router.get('/get-goal', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ goal: user.goal });
  } catch (err) {
    console.error('Error fetching user goal:', err);
    res.status(500).json({ message: 'Failed to fetch user goal', error: err.message });
  }
});

// Route to get the user's name from the token
router.get('/get-name', authenticate, (req, res) => {
  try {
    const { name } = req.user; // Extract the name from the decoded token
    res.json({ name });
  } catch (err) {
    console.error('Error fetching user name:', err);
    res.status(500).json({ message: 'Failed to fetch user name', error: err.message });
  }
});

export default router;
