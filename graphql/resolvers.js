const facebookHighlights = require('../example_data/facebook_highlights.json');

const resolvers = {
  Query: {
    getFBInfo: () => facebookHighlights,
  },
};

module.exports = resolvers;
