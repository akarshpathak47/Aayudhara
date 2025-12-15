const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// ✅ FORCE dotenv to load backend/.env
dotenv.config({
  path: path.resolve(__dirname, '.env'),
});

console.log('ENV CHECK MONGO_URI:', process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const donorRoutes = require('./routes/donorRoutes');
const otpRoutes = require('./routes/otp');

app.use('/api/donor', donorRoutes);
app.use('/api/otp', otpRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('✅ Aayudhara Backend Running');
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
