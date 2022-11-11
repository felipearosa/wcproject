import { tableLogic } from "./tableLogic";

const matches = document.querySelectorAll('.match');

matches.forEach(match => {
  match.addEventListener('change', () => {
    tableLogic(match);
  })
})
