// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mongo connect
mongoose
  .connect('mongodb://127.0.0.1:27017/eka-store')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Mongo error', err));

// test root
app.get('/', (req, res) => {
  res.send('API working');
});

// yahan import + mount zaroor ho
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
