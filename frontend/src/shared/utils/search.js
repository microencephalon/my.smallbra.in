export const getMatchingTags = (val, tagQueries) => {
  return val.tags?.filter((tag) => {
    const regex = new RegExp(tagQueries.join('|'), 'i'); // Create a regex pattern from tagQueries
    return regex.test(tag);
  });
};
