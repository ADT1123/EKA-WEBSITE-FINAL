const express = require('express');
const jwt = require('jsonwebtoken');
const adminAuth = require('../middleware/adminAuth');
const Order = require('../models/Order');

const router = express.Router();

// LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // simple hardcoded login
  if (username !== '@dmin' || password !== 'ek@dmin123') {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET || 'eka-gifts-secret-2025',
    { expiresIn: '24h' }
  );

  res.json({ token });
});

// GET ORDERS (protected)
router.get('/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100);
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
