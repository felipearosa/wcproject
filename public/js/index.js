const matches = document.querySelectorAll('.match');
const inputs = document.querySelectorAll('input');

matches.forEach(match => {
  match.addEventListener('change', () => {
    const guesses = match.querySelectorAll('input');
    const groupTable = match.parentNode.parentNode.nextElementSibling;

    if (guesses[0].value > guesses[1].value) {
      adjustTable(guesses[0], guesses[1], guesses, groupTable);
    } else if (guesses[0].value < guesses[1].value) {
      adjustTable(guesses[1], guesses[0 ], guesses, groupTable);
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

  })
})


const adjustTable = (guessOne, guessTwo, guesses, groupTable) => {
  const firstTeam = groupTable.querySelector(`[data-id="${guessOne.dataset.id}"]`);
  const secondTeam = groupTable.querySelector(`[data-id="${guessTwo.dataset.id}"]`);

  if (guessOne.dataset.result === 'win') {
    return;
  }

  if (guessOne.dataset.result === 'tie') {
    guesses.forEach(guess => {
      const team = groupTable.querySelector(`[data-id="${guess.dataset.id}"]`);
      team.children[2].textContent = (team.children[2].textContent * 1) - 1;
      team.children[4].textContent = (team.children[4].textContent * 1) - 1;
    });
  }

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
