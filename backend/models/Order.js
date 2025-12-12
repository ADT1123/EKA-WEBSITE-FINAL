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

  // payment status
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'paid', 'failed'],
  },

  // delivery status (yehi field React update kar raha hai)
  deliveryStatus: {
    type: String,
    default: 'ordered',
    enum: ['ordered', 'dispatched', 'shipped', 'delivered'],
  },

  couponCode: String,
  paymentId: String,
  razorpayOrderId: String,
  razorpaySignature: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
