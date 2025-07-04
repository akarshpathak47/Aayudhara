// backend/routes/otp.js

const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const otpStore = {}; // TEMPORARY (email: otp)

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

const transporter = nodemailer.createTransport({
  service: 'gmail', // Or use Mailtrap, Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP endpoint
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  const otp = generateOTP();
  otpStore[email] = otp;

  try {
    await transporter.sendMail({
      from: `"BloodBank Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      html: `<h2>Your OTP is: ${otp}</h2><p>It will expire in 5 minutes.</p>`,
    });

    res.json({ success: true, message: 'OTP sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send OTP' });
  }
});

// Verify OTP endpoint
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    delete otpStore[email]; // Clear OTP after success
    return res.json({ success: true, message: 'OTP verified' });
  }

  res.status(400).json({ success: false, message: 'Invalid OTP' });
});

module.exports = router;