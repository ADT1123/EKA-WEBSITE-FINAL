const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    items: [
      {
        productId: { type: String, required: true }, // f1, f2, ...
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        customizations: Schema.Types.Mixed,          // optional JSON
      },
    ],
    customer: {
      name: String,
      email: String,
      phone: String,
    },
    shippingAddress: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: 'India' },
    },
    notes: String,
    totalAmount: Number,
    status: {
      type: String,
      enum: ['created', 'paid', 'cancelled'],
      default: 'created',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
