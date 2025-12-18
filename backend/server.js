const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load env only in local
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
const donorRoutes = require('./routes/donorRoutes');
const otpRoutes = require('./routes/otp');

app.use('/api/donor', donorRoutes);
app.use('/api/otp', otpRoutes);

// ================= HEALTH CHECK =================
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Aayudhara Backend Running ✅' });
});

// ================= SERVE FRONTEND =================
app.use(express.static(path.join(__dirname, '../Frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../Frontend/build', 'index.html')
  );
});

// ================= DATABASE & SERVER =================
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
