// backend/controllers/userController.js
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// DESC: Register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // DESC: Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }
  // DESC: Find it user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // DESC: Hash password
  const salt = await bcrypt.genSalt(10); // takes amount of rounds you want
  const hashedPassword = await bcrypt.hash(password, salt);

  // DESC: Create User
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// DESC: Login a user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // DESC: Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  res.send('Login Route');
});

// DESC: Get current user
// @route /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
  const { id, email, name } = req.user;
  res.status(200).json({ id, email, name });
});

// DESC: Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// DESC: Export the functions
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
