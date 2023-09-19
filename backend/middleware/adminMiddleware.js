// backend/middleware/adminMiddleware.js
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const isAdminOrSameUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (req.user.id !== user.id && !req.user.isAdmin) {
    res.status(401);
    throw new Error('Not authorized');
  }

  req.requestedUser = user;
  next();
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
});

module.exports = { isAdminOrSameUser, isAdmin };
