const mongoose = require('mongoose');

const matchScheema = new mongoose.Schema({
  nationA: {
    type: mongoose.Schema.ObjectId,
    ref: 'Nation'
  },
  nationB: {
    type: mongoose.Schema.ObjectId,
    ref: 'Nation'
  },
  date: Date,
  group: String
});

const Match = new mongoose.model('Match', matchScheema);

module.exports = Match;
