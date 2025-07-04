// backend/utils/otpService.js
const twilio = require('twilio');

// ✅ Correct way to create Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOTP = async (phone) => {
  // Generate 6-digit code
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  console.log(`📨 Sending OTP ${otp} to +91${phone}`);

  await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+91${phone}`          // E.164 format for India
  });

  return otp;
};

module.exports = sendOTP;
