// backend/routes/server.js

require('colors');
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

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

// DESC: Middleware
// CORS so frontend can comm with backend API
app.use(cors());
app.use(express.json()); // for JSON parsing
app.use(express.urlencoded({ extended: false })); // for x-www-form-urlencoded parsing

// DESC: Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

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
