// routes/payments.js
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Route 1: Create Razorpay Order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, customerName, email, phone, address, items } = req.body;

    // Generate unique order ID
    const orderId = 'EKA_' + Date.now();

    // Create order in MongoDB (status: pending)
    const newOrder = new Order({
      orderId,
      customerName,
      email,
      phone,
      address,
      items,
      totalAmount: amount,
      status: 'pending'
    });
    await newOrder.save();

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Convert to paise (₹500 = 50000 paise)
      currency: 'INR',
      receipt: orderId,
      notes: {
        order_id: orderId,
        customer_name: customerName
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Update order with razorpay order ID
    await Order.findOneAndUpdate(
      { orderId },
      { razorpayOrderId: razorpayOrder.id }
    );

    res.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      customerOrderId: orderId
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create order',
      error: error.message 
    });
  }
});

// Route 2: Verify Payment
router.post('/verify', async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      customerOrderId
    } = req.body;

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment verified - update order status
      const updatedOrder = await Order.findOneAndUpdate(
        { orderId: customerOrderId },
        { 
          status: 'paid',
          paymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature
        },
        { new: true }
      );

      res.json({ 
        success: true, 
        message: 'Payment verified successfully',
        order: updatedOrder
      });
    } else {
      // Invalid signature
      await Order.findOneAndUpdate(
        { orderId: customerOrderId },
        { status: 'failed' }
      );

      res.status(400).json({ 
        success: false, 
        message: 'Invalid payment signature' 
      });
    }

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Verification failed',
      error: error.message 
    });
  }
});

module.exports = router;
