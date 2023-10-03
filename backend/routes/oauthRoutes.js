// backend/routes/oauthRoutes.js
const express = require('express');

// DESC: Initialize ExpressJS router
const router = express.Router();

// DESC: deconstruct from userController.js
const {
  githubAuth,
  githubAuthCallback,
} = require('../controllers/authController');

// For GitHub auth
router.get('/github', githubAuth);
router.get('/github/callback', githubAuthCallback);

module.exports = router;
