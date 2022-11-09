const catchAsync = require('./../utils/catchAsync');
const Nation = require('./../models/nationModel');

exports.getAllNations = catchAsync(async (req, res) => {
  const nations = await Nation.find();

  res.status(200).json({
    status: 'sucess',
    results: nations.length,
    nations
  })
})
