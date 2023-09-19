// backend/controllers/searchController.js

const SearchItem = require('../models/searchItemModel');

const searchItems = async (req, res) => {
  const {
    query,
    title,
    category,
    description,
    summary,
    tags,
    type,
    page,
    limit,
    sort,
  } = req.query;

  const canBeInteger = (value) => {
    const parsedValue = parseInt(value);
    return !isNaN(parsedValue) && Number.isInteger(parsedValue);
  };

  if ((limit && !canBeInteger(limit)) || (page && !canBeInteger(page))) {
    return res.status(400).json({
      message: 'Invalid page or limit value. They should be integers.',
    });
  }

  if (limit && !page) {
    console.warn(
      "!!! 'page' parameter not included, 'limit' parameter to be excluded"
    );
  }

  let filterQuery = {};
  let sortQuery = { dateCreated: -1 };

  // Perform a full-text search if a general query is provided

  if (query) {
    const queryRegex = new RegExp(query, 'i'); // case-insensitive
    filterQuery = {
      $or: [
        { title: { $regex: queryRegex } },
        { description: { $regex: queryRegex } },
        { summary: { $regex: queryRegex } },
        { category: { $regex: queryRegex } },
      ],
    };
  } else {
    // If a title is provided, search by title
    if (title || category || description || summary || tags || type) {
      if (tags) {
        const tagList = tags.split(',');
        if (tagList.length > 0) {
          filterQuery.tags = { $all: tagList };
        } else {
          return res.status(400).json({ message: 'No tags provided' });
        }
      }
      if (type) {
        const typeRegex = new RegExp(type, 'i'); // case-insensitive
        filterQuery.itemType = { $regex: typeRegex };
      }
      if (title) {
        const titleRegex = new RegExp(title, 'i'); // case-insensitive
        filterQuery.title = { $regex: titleRegex };
      }
      // If a category is provided, search by category
      if (category) {
        const categoryRegex = new RegExp(category, 'i'); // case-insensitive
        filterQuery.category = { $regex: categoryRegex };
      }
      // If a description is provided, search by description in artifacts
      if (description) {
        if (type === 'blog')
          console.warn(
            "!!! 'description' query parameter not available for type 'portfolio', excluding from query"
          );
        const descriptionRegex = new RegExp(description, 'i'); // case-insensitive
        filterQuery.description = { $regex: descriptionRegex };
      }
      // If a summary is provided, search by summary in posts
      if (summary) {
        if (type === 'portfolio')
          console.warn(
            "!!! 'summary' query parameter not available for type 'blog', excluding from query"
          );
        const summaryRegex = new RegExp(summary, 'i'); // case-insensitive
        filterQuery.summary = { $regex: summaryRegex };
      }
    } else {
      return res
        .status(400)
        .json({ message: 'Invalid or no search query provided' });
    }
  }

  if (sort) {
    // Define sort parameters based on the 'sort' query
    switch (sort) {
      case 'asc':
        sortQuery = { title: 1 };
        break;
      case 'desc':
        sortQuery = { title: -1 };
        break;
      case 'newest':
        sortQuery = { dateCreated: 1 };
        break;
      case 'oldest':
        sortQuery = { dateCreated: -1 };
        break;
      default:
        break;
    }
  }

  // NOTE: When counting the total number of documents and fetching the search results, use the SearchItem model
  const totalCount = await SearchItem.countDocuments(filterQuery);
  const totalPages = Math.ceil(totalCount / limit);

  // NOTE: Consolidate into 'results array', no need to combine different results from models anymore
  let results = [];

  if (page) {
    const itemsPerPage = Number(limit);
    const startIndex = (Number(page) - 1) * itemsPerPage;

    results = await SearchItem.find(filterQuery)
      .sort(sortQuery)
      .skip(startIndex)
      .limit(itemsPerPage);
  } else {
    results = await SearchItem.find(filterQuery).sort(sortQuery);
  }

  // Sort the combined array based on user query preferences
  results.sort((a, b) => {
    const numA = parseInt(a.title.replace(/\D/g, '')); // extract numbers
    const numB = parseInt(b.title.replace(/\D/g, '')); // extract numbers

    // extract strings (remove numbers)
    const strA = a.title.replace(/\d/g, '').trim();
    const strB = b.title.replace(/\d/g, '').trim();

    switch (sort) {
      case 'asc':
        // compare strings first, then numbers
        if (strA > strB) return 1;
        if (strA < strB) return -1;
        if (isNaN(numA)) return 1;
        if (isNaN(numB)) return -1;
        return numA - numB;
      case 'desc':
        // compare strings first, then numbers
        if (strA < strB) return 1;
        if (strA > strB) return -1;
        if (isNaN(numA)) return 1;
        if (isNaN(numB)) return -1;
        return numB - numA;
      case 'newest':
        return new Date(b.dateCreated) - new Date(a.dateCreated);
      case 'oldest':
        return new Date(a.dateCreated) - new Date(b.dateCreated);
      default:
        return new Date(b.dateCreated) - new Date(a.dateCreated);
    }
  });

  if (page) {
    parseInt(page) > totalPages
      ? res.status(416).json({
          message: `416 Range Not Satisfiable: No resource or page ${page} found.`,
        })
      : res.status(200).json({
          page: parseInt(page),
          totalPages,
          resultsCount: results.length,
          results,
        });
  } else if (title || category || description || summary || tags || type) {
    res.status(200).json({ resultsCount: results.length, results });
  } else {
    res.status(200).json({ resultsCount: results.length, results });
  }
};

module.exports = {
  searchItems,
};
