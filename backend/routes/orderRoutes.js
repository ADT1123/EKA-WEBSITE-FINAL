// backend/routes/orderRoutes.js
const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { items, customer, shippingAddress, notes } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      items,
      customer,
      shippingAddress,
      notes,
      totalAmount,
      status: 'created',
    });

    return res.status(201).json({ message: 'Order stored', orderId: order._id });
  } catch (err) {
    console.error('Order error', err);
    return res.status(500).json({ message: 'Failed to create order' });
  }
});

module.exports = router;
