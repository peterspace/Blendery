const mongoose = require('mongoose');

const placeSchema = mongoose.Schema(
  {
    name: String,
    states: [String],

    // name: String,
    // states: [
    //   {
    //     name: String,
    //   },
    // ],
  },
  { timestaps: true }
);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
