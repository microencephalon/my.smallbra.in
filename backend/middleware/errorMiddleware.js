// backend/middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (err.name === 'CastError') {
    statusCode = 404; // Set the status code to 404 for CastError
    err.message = 'Resource not found'; // More user-friendly message
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401; // Set the status code to 401 for invalid tokens
    err.message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401; // Set the status code to 401 for expired tokens
    err.message = 'Token expired';
  } else if (err.name === 'MongoError' && err.code === 11000) {
    statusCode = 400; // Set the status code to 400 for duplicate key error
    err.message = 'Email already exists'; // More user-friendly message
  } else if (err.name === 'SyntaxError') {
    statusCode = 400;
  } else if (err.message.includes('Illegal arguments')) {
    statusCode = 400;
  } else if (
    err.message.includes("Cannot read properties of null (reading 'id')")
  ) {
    statusCode = 404;
    const pattern = "Cannot read properties of null (reading 'id')";
    const replacement = 'User not found.';
    err.message = err.message.replace(pattern, replacement);
    if (err.hasOwnProperty('stack')) {
      err.stack = err.stack.replace(pattern, replacement);
      err.stack = err.stack.replace('TypeError', 'Error');
    }
  } else if (err.name === 'TypeError') {
    statusCode = 400;
  }

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };
