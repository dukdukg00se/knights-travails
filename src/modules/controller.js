import knightData from './data-knight-class';
import * as display from './display-mod';
import * as helper from './helpers';

function clearGame() {
  display.clearBoard();
  knightData.clearData();
}

function setPosition(sq, pos) {
  if (pos === 'start') {
    knightData.start = JSON.parse(sq.dataset.coord);
  } else {
    knightData.finish = JSON.parse(sq.dataset.coord);
  }

  display.boardHl(sq, pos);
}

function startGame(e) {
  const btn = e.target;
  const board = document.querySelector('.checker-board');

  display.btnHl(btn);

  if (btn.id === 'travail') {
    board.onclick = null;

    if (knightData.start && knightData.finish) {
      if (helper.isPathDisplayed()) return;

      display.showPath(knightData.path);
    }
  } else if (btn.id === 'clear') {
    clearGame();
  } else {
    const pos = /start/.test(btn.id) ? 'start' : 'end';
    let targSq;

    if (helper.isPathDisplayed()) {
      clearGame();
    }

    if (btn.id === 'start' || btn.id === 'end') {
      board.onclick = (brdEvnt) => {
        targSq = brdEvnt.target.dataset.coord
          ? brdEvnt.target
          : brdEvnt.target.parentElement;

        setPosition(targSq, pos);
      };
    } else if (btn.id === 'random-start' || btn.id === 'random-end') {
      targSq = document.querySelector(
        `[data-coord="${helper.getRandomCoord()}"]`
      );
      setPosition(targSq, pos);
    }
  }
}

function initGame() {
  const userBtns = document.querySelectorAll('button');
  userBtns.forEach((btn) => {
    btn.addEventListener('click', startGame);
  });
}

export default initGame;
