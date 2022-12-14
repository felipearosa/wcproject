const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs')

const Nation = require("../models/nationModel");
const Match = require('../models/matchModel');

dotenv.config ({ path: './config.env' });


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PW)

mongoose.connect(DB).then(con => {
  console.log('Database successful')
  getAllNations();
});

const getAllNations = async () => {
  const matches = JSON.parse(fs.readFileSync(`${__dirname}/all-group-matches.json`));

  matches.forEach(async match => {
    const teamOne = await Nation.findOne({ "code": match.game.split(' ')[0] });
    const teamTwo = await Nation.findOne({ "code": match.game.split(' ')[1] });
    await Match.create({
      nationA: teamOne,
      nationB: teamTwo,
      date: new Date(match.date),
      group: match.group
    })
  })
}
