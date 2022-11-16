const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const Nation = require('./../models/nationModel');
const Match = require('./../models/matchModel');

exports.getHome = catchAsync(async (req, res) => {
  const nations = await Nation.find();
  const matches = await Match.find().sort([['date', 1]]);

  const groups = ["A", "B", "C", "D", "E", "F", "G", "H"]

  const matchesAndNations = [
    { group: "A", matches: [], nations: [] },
    { group: "B", matches: [], nations: [] },
    { group: "C", matches: [], nations: [] },
    { group: "D", matches: [], nations: [] },
    { group: "E", matches: [], nations: [] },
    { group: "F", matches: [], nations: [] },
    { group: "G", matches: [], nations: [] },
    { group: "H", matches: [], nations: [] }
  ]

  nations.forEach(nation => {
    let i = 0;
    let arrPos;

    while(i < groups.length){
      if(nation.group === groups[i]){
        arrPos = i;
        break
      }
      i++
    }
    matchesAndNations[arrPos].nations.push(nation)
  })

  matches.forEach(match => {
    let i = 0;
    let arrPos;

    while(i < groups.length){
      if(match.group === groups[i]){
        arrPos = i;
        break
      }
      i++
    }
    matchesAndNations[arrPos].matches.push(match)
  })


  res.status(200).render('home', {
    nations,
    matches,
    matchesAndNations
  });
});
