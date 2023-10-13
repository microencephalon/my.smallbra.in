// backend/controllers/searchController.js
const _ = require('lodash');
const SearchItem = require('../models/searchItemModel');

const searchItems = async (req, res) => {
  const allowedQueryParameters = [
    'query',
    'title',
    'category',
    'description',
    'summary',
    'tags',
    'type',
    'page',
    'limit',
    'sort',
  ];

  const pickedQueries = _.pick(req.query, allowedQueryParameters);
  const disallowedQueries = _.difference(
    Object.keys(req.query),
    allowedQueryParameters
  );

  if (disallowedQueries.length) {
    return res.status(400).json({
      message: `Invalid query parameters: ${disallowedQueries.join(', ')}.`,
    });
  }

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
  } = pickedQueries;

  if (_.some([title, category, description, summary]) && query) {
    return res.status(400).json({
      message:
        'General queries and specific queries are exclusive in use. Please use only one type.',
    });
  }

  if ((page && !limit) || (!page && limit)) {
    return res.status(400).json({
      message: "The 'page' and 'limit' parameters must be used together.",
    });
  }

  if (
    (limit && !_.isInteger(Number(limit))) ||
    (page && !_.isInteger(Number(page)))
  ) {
    return res.status(400).json({
      message: 'Invalid page or limit value. They should be integers.',
    });
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
    if (type) {
      filterQuery.itemType =
        type.toLowerCase() === 'blog' ? 'blog' : 'portfolio';
    }
  } else {
    // If a title is provided, search by title
    if (title || category || description || summary || tags || type) {
      if (tags) {
        const tagList = tags.split(',').map((tag) => {
          return {
            tags: {
              $regex: new RegExp(tag, 'i'), // case-insensitive search
            },
          };
        });

        if (tagList.length > 0) {
          filterQuery.$and = tagList;
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
        if (type === 'blog') {
          return res.status(400).json({
            message:
              "The 'description' query parameter not available for type 'portfolio'.",
          });
        }
        const descriptionRegex = new RegExp(description, 'i'); // case-insensitive
        filterQuery.description = { $regex: descriptionRegex };
      }
      // If a summary is provided, search by summary in posts
      if (summary) {
        if (type === 'portfolio') {
          return res.status(400).json({
            message:
              "The 'summary' query parameter not available for type 'blog'.",
          });
        }
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
        sortQuery = { dateCreated: -1 };
        break;
      case 'oldest':
        sortQuery = { dateCreated: 1 };
        break;
      default:
        return res.status(400).json({
          message: `Invalid sorting method. Cannot sort with ${sort}. Options: 'asc', 'desc', 'newest', or 'oldest'`,
        });
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
  switch (sort) {
    case 'asc':
      results = _.orderBy(results, ['title'], ['asc']);
      break;
    case 'desc':
      results = _.orderBy(results, ['title'], ['desc']);
      break;
    case 'newest':
      results = _.orderBy(results, ['dateCreated'], ['desc']);
      break;
    case 'oldest':
      results = _.orderBy(results, ['dateCreated'], ['asc']);
      break;
    default:
      results = _.orderBy(results, ['dateCreated'], ['desc']);
      break;
  }

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
  } else if (_.some([title, category, description, summary, tags, type])) {
    res.status(200).json({ resultsCount: results.length, results });
  } else {
    res.status(200).json({ resultsCount: results.length, results });
  }
};

module.exports = {
  searchItems,
};
