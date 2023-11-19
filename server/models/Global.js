const mongoose = require('mongoose');

const globalSchema = mongoose.Schema({
  global: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const Global = mongoose.model('Global', globalSchema);
module.exports = Global;
