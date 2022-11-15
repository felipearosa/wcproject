const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Match = require('./../models/matchModel');

exports.getAllMatches = catchAsync(async (req,res) => {
  const matches = await Match.find();

  res.status(200).json({
    status: success,
    results: matches.length,
    data: {
      matches
    }
  })
});
