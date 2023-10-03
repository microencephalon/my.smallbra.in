// backend/controllers/authController.js

const asyncHandler = require('express-async-handler');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Redirect to GitHub's OAuth page
const githubAuth = (req, res) => {
  const redirectUri = `${process.env.REACT_APP_API_URL}/api/oauth/github/callback`;
  const clientId = process.env.GITHUB_CLIENT_ID;

  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`
  );
};

// Handle callback from GitHub's OAuth
const githubAuthCallback = asyncHandler(async (req, res) => {
  try {
    // Exchange code for access token
    const { code } = req.query;
    const { data } = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' } }
    );

    // Fetch user info
    const response = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${data.access_token}` },
    });

    // Verify GitHub ID
    const githubId = response.data.id;
    const ownerGithubId = process.env.OWNER_GITHUB_ID
      ? parseInt(process.env.OWNER_GITHUB_ID)
      : 0; // Replace with your GitHub ID
    const ownerGithubEmail = process.env.OWNER_GITHUB_EMAIL
      ? process.env.OWNER_GITHUB_EMAIL
      : '';

    if (githubId !== ownerGithubId) {
      // GitHub ID does not match owner's, return an error response
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Create or Update user in our DB and generate a token for our user
    const user = await User.findOneAndUpdate(
      { githubId: response.data.id },
      {
        name: response.data.name,
        email: ownerGithubEmail, // set e-mail manually in .env
        githubId: response.data.id,
        profilePicture: response.data.avatar_url,
        isAdmin: githubId === ownerGithubId ? true : false,
      },
      { upsert: true, new: true }
    );

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.redirect(`http://localhost:3000/auth?token=${token}`);

    // res.status(200).json({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   profilePicture: user.profilePicture,
    //   token,
    //   code,
    // });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = { githubAuth, githubAuthCallback };
