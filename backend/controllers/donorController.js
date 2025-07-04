// backend/controllers/donorController.js
const Donor = require('../models/Donor');

// ----------------------
// Register Donor
// ----------------------
exports.registerDonor = async (req, res) => {
  try {
    const { fullname, email, phone, city, gender, bloodGroup, dob, password } = req.body;

    // Validation (Optional but recommended)
    if (!fullname || !email || !phone || !city || !gender || !bloodGroup) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for duplicate
    const existing = await Donor.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(409).json({ message: 'Email or phone already exists' });
    }

    const newDonor = new Donor({
      fullname, email, phone, city, gender, bloodGroup, dob, password
    });

    await newDonor.save();
    res.status(201).json({ message: 'Donor registered successfully' });
  } catch (err) {
    console.error('❌ Register Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ----------------------
// Search Donors
// ----------------------
exports.searchDonors = async (req, res) => {
  try {
    const { city, bloodGroup } = req.query;

    const results = await Donor.find({
      city: { $regex: new RegExp(city, 'i') },
      bloodGroup
    });

    res.json(results);
  } catch (err) {
    console.error('❌ Search Error:', err.message);
    res.status(500).json({ message: 'Search failed' });
  }
};

// ----------------------
// Dummy OTP Methods
// ----------------------
exports.sendOtp = async (req, res) => {
  // Just return success (since you're now using Firebase on frontend)
  res.status(200).json({ message: 'OTP sent (dummy response)' });
};

exports.verifyOtp = async (req, res) => {
  // Always succeed for now
  res.status(200).json({ message: 'OTP verified (dummy response)' });
};
