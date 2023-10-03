// backend/middleware/resumeMiddleware.js
const Resume = require('../models/resumeModel');

const setUniqueCurrentResume = async (req, res, next) => {
  const { current } = req.body;

  if (current) {
    await Resume.updateMany(
      { current: true },
      { $set: { current: false } },
      { multi: true }
    );
  }
  next();
};

module.exports = {
  setUniqueCurrentResume,
};
