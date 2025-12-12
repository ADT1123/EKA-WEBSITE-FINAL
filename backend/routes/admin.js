const express = require('express');
const jwt = require('jsonwebtoken');
const adminAuth = require('../middleware/adminAuth');
const Order = require('../models/Order');

const router = express.Router();

// LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

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

// UPDATE ORDER (payment status / delivery status)
const updateOrder = async (req, res) => {
  try {
    const { status, deliveryStatus } = req.body;

    const update = {};
    if (status) update.status = status;
    if (deliveryStatus) update.deliveryStatus = deliveryStatus;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error('Update order error', err);
    res.status(500).json({ message: 'Failed to update order' });
  }
};

router.patch('/orders/:id', adminAuth, updateOrder);

// DELETE ORDER
router.delete('/orders/:id', adminAuth, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
