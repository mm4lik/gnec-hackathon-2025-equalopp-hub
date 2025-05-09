// middleware/auth.js
import jwt from 'jsonwebtoken';
import { User } from '../models/database.js'; 

export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); // Use `id` instead of `userId`
    console.log(user)
    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = user; // Attach user to request
    next();
  } catch (err) {

    console.error('Auth error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};
