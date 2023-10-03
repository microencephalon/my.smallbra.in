// backend/server.js
require('colors');
require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const expressOpts = require('./config/expressOpts');
const cors = require('cors');
const { corsOptions } = require('./config/corsOpts');
const helmet = require('helmet');
const { helmetOptions } = require('./config/helmetOpts');
const { routes } = require('./config/routes');
const { errorHandler } = require('./middleware/errorMiddleware');
const Artifact = require('./models/artifactModel');
const Post = require('./models/postModel');
const syncSearchItems = require('./scripts/syncSearchItems');

const startServer = async () => {
  // Add any new items from Artifact and Post collections, delete any stale elements
  await syncSearchItems();

  const STAGE = process.env.NODE_ENV;
  const PORT = process.env.PORT || 8000;

  // DESC: Initialize Express
  const app = express();
  expressOpts.disable.forEach((setting) => app.disable(setting));
  expressOpts.enable.forEach((setting) => app.enable(setting));

  // DESC: Connect to MongoDB
  connectDB();

  // DESC: Ensure Indexes for Artifact and Post Models
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

  // DESC: Add uses to Express: helmet, cors, json, urlencoding
  app.use(
    helmet(helmetOptions), // security headers
    cors(corsOptions), // allow frontend communication with backend API
    express.json(expressOpts.json), // JSON parsing
    express.urlencoded(expressOpts.urlencoded) // x-www-form-urlencoded parsing
  );

  // DESC: Set up api routes
  routes.forEach((route) => {
    app.use(route.path, route.handler);
  });

  // DESC: Serve frontend
  if (STAGE === 'production') {
    // Set build folder as static
    app.use(
      express.static(expressOpts.statick.root, expressOpts.statick.options)
    );

    // App * anything, except for the routes created
    app.get('*', (_, res) =>
      res.sendFile(__dirname, `${expressOpts.statick.root}/index.html`)
    );
  } else {
    // Send message
    app.get('/', (_, res) => {
      res.status(200).json({ message: "Welcome to the 'my.smallbra.in' API." });
    });
  }

  // DESC: Set up error handler
  app.use(errorHandler);

  // DESC: Listen on that port for the server
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

startServer();
