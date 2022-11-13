const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Nation = require('./../models/nationModel');

exports.getAllNations = catchAsync(async (req, res) => {
  const nations = await Nation.find();

  res.status(200).json({
    status: 'sucess',
    results: nations.length,
    nations
  })
})

exports.getNation = catchAsync(async (req,res) => {
  const nation = await Nation.findById(req.params.id);

  if(!nation){
    return next(new AppError('The ID is wrong!', 404))
  }

  res.status(200).json({
    status: "success",
    data: {
      nation
    }
  })
})
