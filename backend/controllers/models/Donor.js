// backend/models/Donor.js
const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  fullname:   { type: String,  required: true },
  email:      { type: String,  required: true, unique: true },  // 🔒 unique email
  phone:      { type: String,  required: true, unique: true },  // 🔒 unique phone
  city:       { type: String },
  gender:     { type: String },
  bloodGroup: { type: String },
  dob:        { type: String },
  password:   { type: String }
});

// 👉 make sure the unique indexes are built in MongoDB
donorSchema.index({ email: 1  }, { unique: true });
donorSchema.index({ phone: 1  }, { unique: true });

module.exports = mongoose.model('Donor', donorSchema);
