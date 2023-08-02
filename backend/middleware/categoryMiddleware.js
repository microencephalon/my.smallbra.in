// backend/middleware/categoryMiddleware.js
const asyncHandler = require('express-async-handler');

const validateCategory = (Model) =>
  asyncHandler(async (req, res, next) => {
    if (req.body.category) {
      // Find category by name or create new one
      let category = await Model.findOne({ name: req.body.category });

      if (!category) {
        category = new Model({ name: req.body.category });
        await category.save();
      } else {
      }

      // If the category is valid, we can add it to the request object so that it can be used in future middleware or route handlers.
      req.category = category;

      next();
    } else {
      console.error('No category provided in request body');
      res.status(400);
      throw new Error('No category provided');
    }
  });

module.exports = validateCategory;
