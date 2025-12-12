require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const paymentRoutes = require('./routes/payments');

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:8080",
      "http://localhost:8081",
      "https://www.ekagifts.com",
      "https://ekagifts.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// ADMIN ROUTES
app.use('/api/admin', adminRoutes);

// health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Mongo + other routes
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'EKA Backend Running' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
