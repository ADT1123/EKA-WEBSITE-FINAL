// routes/admin.js
const express = require('express');
const jwt = require('jsonwebtoken');
const adminAuth = require('../middleware/adminAuth');
const Order = require('../models/Order');

const router = express.Router();

// 1) LOGIN ROUTE
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // simple hardcoded admin
  if (username !== 'admin' || password !== 'admin123') {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET || 'eka-gifts-secret-2025',
    { expiresIn: '24h' }
  );

  res.json({ token });
});

// 2) GET ORDERS (protected)
router.get('/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100);
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
