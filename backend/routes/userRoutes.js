const express = require('express');

// DESC: Initialize ExpressJS router
const router = express.Router();

// DESC: deconstruct from userController.js
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

// Route protector
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
