const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Nation = require('./../models/nationModel');
const { dirname } = require('path');

dotenv.config ({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PW)

mongoose.connect(DB).then(con => console.log('Database successful'));

const nations = JSON.parse(fs.readFileSync(`${__dirname}/all-nations-ext-api.json`));

const importData = async () => {
  try{
    await Nation.create(nations);
    console.log('DB imported');
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

const deleteData = async () => {
  try{
    await Nation.deleteMany();
    console.log('DB deleted');
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

if(process.argv[2] === '--import'){
  importData();
} else if(process.argv[2] === '--delete'){
  deleteData();
}
