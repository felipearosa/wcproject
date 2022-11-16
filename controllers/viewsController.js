const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const Nation = require('./../models/nationModel');
const Match = require('./../models/matchModel');

exports.getHome = catchAsync(async (req,res) => {
  res.status(200).render('home')
})
