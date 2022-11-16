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
  console.log(guesses);
  const groupTable = match.parentNode.nextElementSibling;
  console.log(groupTable);



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
}
