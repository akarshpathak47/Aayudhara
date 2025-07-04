// backend/routes/donorRoutes.js
const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

router.post('/send-otp', donorController.sendOtp);
router.post('/verify-otp', donorController.verifyOtp);

router.post('/register', donorController.registerDonor);
router.get('/search', donorController.searchDonors);

module.exports = router;
