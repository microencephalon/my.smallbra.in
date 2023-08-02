// backend/server.js
require('colors');
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const oauthRoutes = require('./routes/oauthRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const postCategoryRoutes = require('./routes/postCategoryRoutes');
const artifactRoutes = require('./routes/artifactRoutes');
const artifactCategoryRoutes = require('./routes/artifactCategoryRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const searchRoutes = require('./routes/searchRoutes');

// const Artifact = require('../models/artifactModel'); // Add this line
// const Post = require('../models/postModel'); // Add this line

const Artifact = require('./models/artifactModel');
const Post = require('./models/postModel');

const app = express();
const STAGE = process.env.NODE_ENV;
// const devDomain = 'localhost';
// const prodDomain = 'my.smallbra.in';
const PORT = process.env.PORT || 8000;
// const origin =
//   STAGE === 'development'
//     ? `http://${devDomain}:${PORT}`
//     : `https://${prodDomain}:${PORT}`;

// Connect to Database
connectDB();

// Ensure Indexes for Artifact and Post Models
async function createIndexes() {
  try {
    await Artifact.init();
    await Post.init();
    console.log('Indexes ensured for Artifact and Post models');
  } catch (err) {
    console.error('Error ensuring indexes', err);
  }
}
createIndexes();

// DESC: Middleware
// CORS so frontend can comm with backend API
if (STAGE === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:3000', // replace with your frontend address
      credentials: true,
    })
  );
} else if (STAGE === 'production') {
  app.use(
    cors({
      origin: 'https://my,smallbra.in', // replace with your frontend address
      credentials: true,
    })
  );
}
app.use(express.json()); // for JSON parsing
app.use(express.urlencoded({ extended: false })); // for x-www-form-urlencoded parsing

// DESC: Routes
app.use('/api/oauth', oauthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/post-categories', postCategoryRoutes);
app.use('/api/artifacts', artifactRoutes);
app.use('/api/artifact-categories', artifactCategoryRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/search', searchRoutes);

// DESC: Serve frontend
if (STAGE === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // App * anything, except for the routes created
  app.get('*', (_, res) =>
    res.sendFile(__dirname, '../frontend/build/index.html')
  );
} else {
  // Send message
  app.get('/', (_, res) => {
    res.status(200).json({ message: "Welcome to the 'my.smallbra.in' API." });
  });
}

app.use(errorHandler);

// DESC: Listen on that port for the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
