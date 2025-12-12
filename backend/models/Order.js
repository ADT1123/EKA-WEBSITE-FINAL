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

  // Payment status
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'paid', 'failed'],
  },

  // Delivery status
  deliveryStatus: {
    type: String,
    default: 'ordered',
    enum: ['ordered', 'dispatched', 'shipped', 'delivered'],
  },

  // Admin dashboard: order checked / unchecked
  isChecked: {
    type: Boolean,
    default: false,
  },

  // Admin dashboard: notes
  notes: {
    type: String,
    default: '',
  },

  couponCode: String,
  paymentId: String,
  razorpayOrderId: String,
  razorpaySignature: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
