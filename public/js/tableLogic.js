export const adjustTable = (guessOne, guessTwo, guesses, groupTable) => {
  const firstTeam = groupTable.querySelector(`[data-id="${guessOne.dataset.id}"]`);
  const secondTeam = groupTable.querySelector(`[data-id="${guessTwo.dataset.id}"]`);

  //if nothing changes
  if (guessOne.dataset.result === 'win') {
    return;
  }

  //if it were a tie, remove tie from table
  if (guessOne.dataset.result === 'tie') {
    guesses.forEach(guess => {
      const team = groupTable.querySelector(`[data-id="${guess.dataset.id}"]`);
      team.children[2].textContent = (team.children[2].textContent * 1) - 1;
      team.children[4].textContent = (team.children[4].textContent * 1) - 1;
    });
  }

  // if first guess used to lose, remove points from the other team
  if (guessOne.dataset.result === 'lose') {
      firstTeam.children[3].textContent = (firstTeam.children[3].textContent * 1) - 1;
      secondTeam.children[1].textContent = (secondTeam.children[1].textContent * 1) - 1;
      secondTeam.children[4].textContent = (secondTeam.children[4].textContent * 1) - 3;
  }

  firstTeam.children[1].textContent = (firstTeam.children[1].textContent * 1) + 1;
  firstTeam.children[4].textContent = (firstTeam.children[4].textContent * 1) + 3;

  secondTeam.children[3].textContent = (firstTeam.children[3].textContent * 1) + 1;

  guessOne.dataset.result='win';
  guessTwo.dataset.result='lose';

}


export const tableLogic = match => {
  const guesses = match.querySelectorAll('input');
  const groupTable = match.parentNode.nextElementSibling;

  //first team wins
  if (guesses[0].value > guesses[1].value) {
    adjustTable(guesses[0], guesses[1], guesses, groupTable);
    //second team wins
  } else if (guesses[0].value < guesses[1].value) {
    adjustTable(guesses[1], guesses[0], guesses, groupTable);
    //tie
  } else {
    if (guesses[0].dataset.result === 'tie') {
      return;
    }

    guesses.forEach(guess => {
      const team = groupTable.querySelector(`[data-id="${guess.dataset.id}"]`);

      if (guess.dataset.result === 'lose') {
        team.children[3].textContent = (team.children[3].textContent * 1) - 1;
      }

      if (guess.dataset.result === 'win') {
        team.children[1].textContent = (team.children[1].textContent * 1) - 1;
        team.children[4].textContent = (team.children[4].textContent * 1) - 3;
      }

      team.children[2].textContent = (team.children[2].textContent * 1) + 1;
      team.children[4].textContent = (team.children[4].textContent * 1) + 1;
    });

    guesses[0].dataset.result='tie';
    guesses[1].dataset.result='tie';
  }

  adjustPosition(groupTable.querySelector('table'));
}

export const adjustPosition = table => {
  const tableHeader = table.firstChild.firstChild.innerHTML
  console.log(tableHeader)
  const nations = table.querySelectorAll("tr:not(:first-child)");

  let arrPosition = []

  nations.forEach(nation => {
    const nationInfo = nation.querySelectorAll('td');
    const pointsText = nationInfo[nationInfo.length- 1];
    const points = +pointsText.textContent
    if (arrPosition.length === 0) {
      arrPosition.push(nation)
    } else {
      for (let [i, positionedNation] of arrPosition.entries()) {
        if (nation.dataset.id === positionedNation.dataset.id) return;
        if (arrPosition.length === 4 ) return;

        const positionedInfo = positionedNation.querySelectorAll('td');
        const  positionedPointsText = positionedInfo[positionedInfo.length- 1];
        const positionedPoints = +positionedPointsText.textContent

        if(points > positionedPoints){
          arrPosition.splice(i, 0, nation);
          break;
        } else if (points === positionedPoints || arrPosition.length - i  === 1 ) {
          arrPosition.splice(i + 1, 0, nation);
        }
      }
    }
  })

  const finalPosition = arrPosition.map(el => el.outerHTML);
  console.log(finalPosition.join(""));
  console.log(finalPosition);

  console.log('fvweew', nations);

  table.innerHTML = ""
  table.innerHTML = `${tableHeader} ${finalPosition.join("")}`
}
