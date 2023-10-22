// backend/controllers/userController.js
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

// DESC: Register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  // DESC: Validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }
  // DESC: Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(409);
    throw new Error('User email already exists');
  }

  // DESC: Create User
  const user = await User.create({
    name: name,
    email: email,
    password: password,
    isAdmin: !JSON.parse(process.env.ENABLE_ISADMIN_FOR_OWNER_ONLY)
      ? isAdmin
      : false,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
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

  if (!email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const user = await User.findOne({ email });

  if (!user) {
    // check if user exists or not
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // DESC: Check user and passwords match
  if (await user.matchPasswords(password)) {
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
});

// DESC: Get current user
// @route /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    const updatableFields = [
      'id',
      'name',
      'email',
      'phone',
      'birthday',
      'profilePicture',
    ];

    const userData = updatableFields.reduce((acc, field) => {
      if (user[field]) {
        acc[field] = user[field];
      }
      return acc;
    }, {});

    res.status(200).json(userData);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// DESC: Get user by ID
// @route /api/users/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// DESC: Get all users
// @route /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (!users || users.length === 0) {
    res.status(404);
    throw new Error('No users found');
  }

  res.json(users);
});

// DESC: OPTIONS for Users
// @route /api/users/
// @access Private
const optionsUsers = asyncHandler(async (req, res) => {
  res.header('Allow', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.status(200).json();
});

// DESC: Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed', userId: req.params.id });
  } else {
    res.status(404);
    throw new Error({ message: 'User not found', userId: req.params.id });
  }
});

// DESC: Update user
// @route PATCH /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // Define the fields that can be updated by a user
    const updatableFields = [
      'name',
      'email',
      'phone',
      'birthday',
      'profilePicture',
    ];

    if (JSON.parse(process.env.USER_PW_IS_UPDATABLE)) {
      updatableFields.push('password');
    }

    // Update only the fields that have changed
    updatableFields.forEach((field) => {
      if (field in req.body && req.body[field] !== user[field]) {
        if (field === 'birthday') {
          const newDate = new Date(req.body[field]);
          user[field] = newDate.toISOString();
        } else if (field === 'password') {
          user[field] = req.body[field];
        } else {
          user[field] = req.body[field];
        }
      }
    });

    // Only allow admins to update the isAdmin property
    if (req.user && req.user.isAdmin && 'isAdmin' in req.body) {
      user.isAdmin = req.body.isAdmin;
    }

    // Save user and handle potential validation errors
    try {
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: 'User email already exists' }); // Handle duplicate key error
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DESC: Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// DESC: Check if user is an admin
// @route GET /api/users/verify-if-admin
// @access private
const verifyIfAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user && user.isAdmin) {
    res.status(200).json({ isAdmin: true });
  } else {
    res.status(200).json({ isAdmin: false });
  }
});

// DESC: Export the functions
module.exports = {
  registerUser,
  loginUser,
  optionsUsers,
  getMe,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  verifyIfAdmin,
};
