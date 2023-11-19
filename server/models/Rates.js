const mongoose = require('mongoose');

const ratesSchema = mongoose.Schema({
  rates: {
    type: mongoose.Schema.Types.Mixed,
  },
  trending: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const Rates = mongoose.model('Rates', ratesSchema);
module.exports = Rates;
