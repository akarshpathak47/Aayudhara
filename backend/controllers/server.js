// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();                    // ⬅️ Load .env first
console.log('✅ TWILIO SID Loaded:', process.env.TWILIO_ACCOUNT_SID);

const donorRoutes = require('./routes/donorRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/donor', donorRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  }))
  .catch(err => console.error(err));
