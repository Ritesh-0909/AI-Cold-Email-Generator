const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.registerUser);
// Login a user
router.post('/login', authController.loginUser);
// //Verify otp
router.post('/verify-otp', authController.verifyOTP);
// Resend OTP
router.post('/resend-otp', authController.resendOTP);
// Send via voice
router.post('/voice-otp', authController.voiceOTP);
// Forgot password
router.post('/forgot-password', authController.forgotPassword);

router.post('/reset-password', authController.resetPassword);



module.exports = router;