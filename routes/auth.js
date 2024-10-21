const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { country_code, mobile_number } = req.body;
  const fullNumber = country_code + mobile_number;
  
  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    await db.execute('INSERT INTO otps (mobile_number, otp) VALUES (?, ?)', [fullNumber, otp]);
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: `Mobile number is invalid ${fullNumber}` });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { mobile_number, otp } = req.body;
  
  try {
    const [rows] = await db.execute('SELECT * FROM otps WHERE mobile_number = ? AND otp = ?', [mobile_number, otp]);
    
    if (rows.length > 0) {
      await db.execute('DELETE FROM otps WHERE mobile_number = ?', [mobile_number]);
      
      const accessToken = jwt.sign({ mobile_number }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ mobile_number }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
      
      await db.execute('INSERT INTO users (mobile_number, access_token, refresh_token) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE access_token = ?, refresh_token = ?', 
        [mobile_number , accessToken, refreshToken, accessToken, refreshToken]);
      
      res.json({ success: true, message: 'OTP verified successfully', access_token: accessToken, refresh_token: refreshToken });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

module.exports = router;