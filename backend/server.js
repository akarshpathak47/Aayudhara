const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const donorRoutes = require('./routes/donorRoutes');
const otpRoutes = require('./routes/otp');

// Register routes
app.use('/api/donor', donorRoutes);
app.use('/api/otp', otpRoutes);

// Serve React frontend from /build
app.use(express.static(path.join(__dirname, '../build')));

// React Router fallback (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
