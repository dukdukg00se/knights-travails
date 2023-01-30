/* eslint-disable no-param-reassign */

import * as content from './content';

function clearBoard() {
  const board = document.querySelector('.checker-board');
  board.onclick = null;
  const squares = document.querySelectorAll('.square');
  squares.forEach((square) => {
    if (square.classList.contains('start')) {
      square.classList.toggle('start');
    }

    if (square.classList.contains('end')) {
      square.classList.toggle('end');
    }

    square.firstChild.style.opacity = '0';
    square.lastChild.textContent = '';
  });
}

// Think about moving this
function initView() {
  const contentContainer = document.getElementById('content');
  contentContainer.append(content.createHeader(), content.createMainContent());
}

function panelHl(btn) {
  const prevBtn = document.querySelector('.active');

  if (prevBtn && prevBtn.id !== btn.id) {
    prevBtn.classList.remove('active');
  }

  if (btn.id === 'start' || btn.id === 'end') {
    btn.classList.add('active');
  }
}

function boardHl(sq, position) {
  const prevSq = document.querySelector(`.${position}`);

  if (!sq.classList.contains('square')) {
    return;
  }

  if (position === 'start' || position === 'random-start') {
    if (prevSq) {
      prevSq.firstChild.style.opacity = '0';
      prevSq.classList.remove('start');
    }

    sq.firstChild.style.opacity = '1';
    sq.classList.add('start');
  } else if (position === 'end' || position === 'random-end') {
    if (prevSq) {
      prevSq.classList.remove('end');
    }

    sq.classList.add('end');
  }
}

function getSquare(input) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mvString = JSON.stringify(input).replace(',', ', ');
      const square = document.querySelector(`[data-coord="${mvString}"]`);

      resolve(square);
    }, 800);
  });
}

async function displayPath(path) {
  for (let i = 0; i < path.length; i += 1) {
    const square = await getSquare(path[i]);

    square.classList.add('end');
    square.firstChild.style.opacity = '1';
    square.lastChild.textContent = i;
  }
}

export { clearBoard, initView, panelHl, displayPath, boardHl };
