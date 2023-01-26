/* eslint-disable no-param-reassign */

import * as content from './content';
import Tree from './data-tree-class';
import { getKnightPath } from './data-handlers';

function clearBoard() {
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

function initView() {
  const contentContainer = document.getElementById('content');
  contentContainer.append(content.createHeader(), content.createMainContent());
}

function hlActiveBtn(current, prev) {
  if (prev && prev.id !== current.id) {
    prev.classList.remove('active');
  }

  if (current.id === 'start' || current.id === 'end') {
    current.classList.add('active');
  }
}

function hlStartSq(current, prev) {
  if (!current.classList.contains('square')) {
    return;
  }

  current.firstChild.style.opacity = '1';
  current.classList.add('start');

  if (prev) {
    if (prev.dataset.coord !== current.dataset.coord) {
      prev.firstChild.style.opacity = '0';
      prev.classList.remove('start');
    }
  }
}

function hlEndSq(current, prev) {
  current.classList.add('end');
  if (prev) {
    if (prev.dataset.coord !== current.dataset.coord) {
      prev.firstChild.style.opacity = '0';
      prev.classList.remove('end');
    }
  }
}

function wait(input) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mvString = JSON.stringify(input).replace(',', ', ');
      const square = document.querySelector(`[data-coord="${mvString}"]`);

      resolve(square);
    }, 800);
  });
}

async function showPath() {
  // const kTree = new Tree(start, end);
  // const knightPath = kTree.getPath();

  const knightPath = getKnightPath();

  for (let i = 0; i < knightPath.length; i++) {
    const square = await wait(knightPath[i]);

    square.classList.add('end');
    square.firstChild.style.opacity = '1';
    square.lastChild.textContent = i;
  }
}

export { clearBoard, initView, hlActiveBtn, hlStartSq, hlEndSq, showPath };
