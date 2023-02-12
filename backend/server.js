const path = require('path');
const express = require('express');
const app = express();
require('colors');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 8000;

// DESC: Connect to Database
connectDB();

// DESC: Middleware
app.use(express.json()); // for JSON parsing
app.use(express.urlencoded({ extended: false })); // for x-www-form-urlencoded parsing

// DESC: Routes
app.use('/api/users', require('./routes/userRoutes'));

// DESC: Serve frontend
if (process.env.NODE_ENV === 'production') {
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
