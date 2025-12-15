const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load env vars ONLY locally
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

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
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
