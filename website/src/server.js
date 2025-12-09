const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/eka-store'); // ya Mongo Atlas URI

app.get('/', (req, res) => {
  res.send('API working');
});

app.listen(5000, () => console.log('API running on 5000'));
