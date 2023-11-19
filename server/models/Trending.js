const mongoose = require('mongoose');

const trendingSchema = mongoose.Schema({
  trending: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const Trending = mongoose.model('Trending', trendingSchema);
module.exports = Trending;
