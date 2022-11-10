const mongoose = require('mongoose');

const nationSchema = new mongoose.Schema({
  name: String,
  flag: String,
  code: String,
  group: String,
  // players: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref:'Player'
  //   }
  // ]
})

const Nation = new mongoose.model('Nation', nationSchema);

module.exports = Nation;
