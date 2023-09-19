const SearchItem = require('../models/searchItemModel');

const createOrUpdateSearchItem = async (doc, modelType) => {
  // Determine the item type
  const itemType = modelType === 'Post' ? 'blog' : 'portfolio';

  // Find an existing search item
  let searchItem = await SearchItem.findOne({ refId: doc._id });

  // If a search item does not exist, create a new one
  if (!searchItem) {
    searchItem = new SearchItem({
      dateCreated: doc.dateCreated,
      dateModified: doc.dateModified,
      user: doc.user,
      title: doc.title,
      author: doc.author,
      category: doc.category,
      description: doc.description || null,
      summary: doc.summary || null,
      tags: doc.tags || [],
      slug: doc.slug,
      visible: doc.visible,
      onModel: modelType,
      itemType: itemType,
      refId: doc._id,
    });
  } else {
    // If a search item does exist, update the fields
    searchItem.dateModified = doc.dateModified || searchItem.dateModified;
    searchItem.user = doc.user || searchItem.user;
    searchItem.title = doc.title || searchItem.title;
    searchItem.author = doc.author || searchItem.author;
    searchItem.category = doc.category || searchItem.category;
    searchItem.description = doc.description || searchItem.description;
    searchItem.summary = doc.summary || searchItem.summary;
    searchItem.tags = doc.tags || searchItem.tags;
    searchItem.slug = doc.slug || searchItem.slug;
    searchItem.visible = doc.visible;
  }

  // Save the search item
  await searchItem.save();
};

module.exports = {
  createOrUpdateSearchItem,
};
