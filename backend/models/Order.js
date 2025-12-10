// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: String,
  email: String,
  phone: String,
  address: String,
  items: Array,
  totalAmount: Number,
  status: { 
    type: String, 
    default: 'pending',
    enum: ['pending', 'paid', 'failed', 'delivered']
  },
  paymentId: String,
  razorpayOrderId: String,
  razorpaySignature: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
