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

matchScheema.pre(/^find/, function(next){
  this.populate({
    path: 'nationA nationB',
    select: 'code flag'
  })
  next();
})


const Match = new mongoose.model('Match', matchScheema);

module.exports = Match;
