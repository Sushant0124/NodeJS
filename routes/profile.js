const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');

// Create Profile
router.post('/profile', async (req, res) => {
  const { name, email, company, city } = req.body;
  const token = req.headers['authorization'];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const mobile_number = decoded.mobile_number;
    
    await db.execute('UPDATE users SET name = ?, email = ?, company = ?, city = ? WHERE mobile_number = ?', 
      [name, email, company, city, mobile_number]);
    
    res.json({ success: true, message: 'Profile created successfully' });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
});

// Get Profile
router.get('/profile', async (req, res) => {
  const token = req.headers['authorization'];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const mobile_number = decoded.mobile_number;
    
    const [rows] = await db.execute('SELECT * FROM users WHERE mobile_number = ?', [mobile_number]);
    
    if (rows.length > 0) {
      res.json({ name: rows[0].name, email: rows[0].email, company: rows[0].company, city: rows[0].city });
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
});

// Refresh Token
router.post('/refresh-token', async (req, res) => {
  const { refresh_token } = req.body;
  
  try {
    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
    const mobile_number = decoded.mobile_number;
    
    const accessToken = jwt.sign({ mobile_number }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ success: true, message: 'Token refreshed successfully', access_token: accessToken });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
});

module.exports = router;