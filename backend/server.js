// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const paymentRoutes = require('./routes/payments');

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://eka-website-weld.vercel.app"
    ],
  })
);
app.use(express.json());

// MongoDB Connection (FIXED)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.use('/api/payments', paymentRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'EKA Backend Running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
