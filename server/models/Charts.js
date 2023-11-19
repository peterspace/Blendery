const mongoose = require('mongoose');

const chartsSchema = mongoose.Schema({
  charts: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const Charts = mongoose.model('Charts', chartsSchema);
module.exports = Charts;
