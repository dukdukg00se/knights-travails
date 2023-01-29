/* eslint-disable */

import Tree from './data-tree-class';
import { boardHl } from './display';

let start;
let finish;

function clearData() {
  start = null;
  finish = null;
}

function randomCoord() {
  const squares = document.querySelectorAll('.square');
  const randomNmbr = Math.floor(Math.random() * 64);
  const selected = squares[randomNmbr];
  const randomSquareCoord = selected.dataset.coord;

  // Return string of square coordinates
  return randomSquareCoord;
  // return JSON.parse(randomSquare);
}

function getKnightPath(begin = start, end = finish) {
  const kTree = new Tree(begin, end);
  const knightPath = kTree.getPath();
  return knightPath;
}

function logCoord(position, coord) {
  position === 'start'
    ? (start = JSON.parse(coord))
    : (finish = JSON.parse(coord));
}

// setBoard(e)
function logUserCoord(e) {
  const board = document.querySelector('.checker-board');
  const position = /start/.test(e.target.id) ? 'start' : 'end';
  let selectedSquare;

  if (e.target.id === 'travail') {
    board.onclick = null;

    if (start && finish) {
      if (isPathDisplayed()) {
        return;
      }
      showPath();
      // logUserCoord(false);
    }
  }

  if (e.target.id === 'start' || e.target.id === 'end') {
    board.onclick = (brdEvnt) => {
      selectedSquare = brdEvnt.target.dataset.coord
        ? brdEvnt.target
        : brdEvnt.target.parentElement;

      boardHl(selectedSquare, position);
      logCoord(position, selectedSquare.dataset.coord);

      // position === 'start'
      //   ? (start = JSON.parse(selectedSquare.dataset.coord))
      //   : (finish = JSON.parse(selectedSquare.dataset.coord));
    };
  }

  if (e.target.id === 'random-start' || e.target.id === 'random-end') {
    const stringCoord = randomCoord();
    selectedSquare = document.querySelector(`[data-coord="${stringCoord}"]`);

    boardHl(selectedSquare, position);
    logCoord(position, stringCoord);

    // position === 'start'
    //   ? (start = JSON.parse(stringCoord))
    //   : (finish = JSON.parse(stringCoord));
  }
}

export { clearData, randomCoord, logUserCoord, getKnightPath };
