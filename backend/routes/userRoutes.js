// backend/routes/userRoutes.js
const express = require('express');

// DESC: Initialize ExpressJS router
const router = express.Router();

// DESC: deconstruct from userController.js
const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser,
  getUser,
  optionsUsers,
  verifyIfAdmin,
} = require('../controllers/userController');

// Determine admin user or self
const { isAdminOrSameUser } = require('../middleware/adminMiddleware');

// Route protector
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/verify-if-admin', protect, verifyIfAdmin);
router.get('/:id', protect, isAdminOrSameUser, getUser);
router.patch('/:id', protect, isAdminOrSameUser, updateUser);
router.delete('/:id', protect, isAdminOrSameUser, deleteUser);
router.options('/', optionsUsers);

module.exports = router;
