// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const logger = require('../logger');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (!req.headers.authorization) {
    logger.error(
      'Missing Authorization Header or empty value for Authorization header'
    );
    res.status(400);
    throw new Error(
      'Missing Authorization Header or empty value for Authorization header'
    );
  } else if (!req.headers.authorization.startsWith('Bearer')) {
    logger.error('Authorization Header can only include Bearer token');
    res.status(400);
    throw new Error('Authorization Header can only include Bearer token');
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Check if the header can be split into exactly two parts
    const splitHeader = req.headers.authorization.split(' ');
    if (splitHeader.length !== 2) {
      logger.error(
        "Authorization Header starts with Bearer, but the syntax is malformed. Possible that no whitespace after 'Bearer'"
      );
      res.status(400);
      throw new Error(
        "Authorization Header starts with Bearer, but the syntax is malformed. Possible that no whitespace after 'Bearer'"
      );
    }

    // Get token from header
    token = splitHeader[1];

    // Check if the token has three parts
    const tokenParts = token.split('.').length;
    if (tokenParts !== 3) {
      logger.error(
        `Malformed Token: ${token}, Error: Token should have exactly three parts separated by dots (header.payload.signature)`
      );
      res.status(400);
      throw new Error(
        'Malformed Token: Token should have exactly three parts separated by dots (header.payload.signature)'
      );
    }

    try {
      // Try to decode just the header and payload
      const decoded = jwt.decode(token, { complete: true });
      if (!decoded || !decoded.header || !decoded.payload) {
        logger.error('Malformed Token');
        res.status(400);
        throw new Error('Malformed Token');
      }
    } catch (error) {
      logger.error(`Malformed Token Error: ${error.message}`);
      res.status(400);
      throw new Error('Malformed Token');
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      // Debug: Log error type and message
      logger.error(`Error Type: ${error.constructor.name}`);
      logger.error(`Error Message: ${error.message}`);

      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401);
        throw new Error('Not authorized, token verification failed');
      } else {
        logger.error(`Token verification failed: ${error.message}`);
        res.status(401);
        throw new Error('Not authorized, token verification failed');
      }
    }
  }
});

module.exports = { protect };
