import { adjustTable } from "./tableLogic";

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
