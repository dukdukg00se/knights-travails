#!/usr/bin/env node

class Node {
  constructor(coord) {
    this.coord = coord;
    this.parent = null;
  }
}

class Tree {
  constructor(startCoord, endCoord) {
    this.root = this.buildPathTree(startCoord, endCoord);
  }

  getPossibleMoves(coord) {
    let [x, y] = coord;

    let mv1 = [x + 1, y + 2];
    let mv2 = [x + 1, y - 2];
    let mv3 = [x - 1, y + 2];
    let mv4 = [x - 1, y - 2];
    let mv5 = [x + 2, y + 1];
    let mv6 = [x + 2, y - 1];
    let mv7 = [x - 2, y + 1];
    let mv8 = [x - 2, y - 1];

    let allMvs = [mv1, mv2, mv3, mv4, mv5, mv6, mv7, mv8];
    return allMvs.filter(
      (innerArr) => innerArr.every((elem) => elem >= 0 && elem <= 7) == true
    );
  }

  checkCoordsEqual(coord1, coord2) {
    return JSON.stringify(coord1) === JSON.stringify(coord2);
  }

  buildPathTree(coord1, coord2) {
    let rootNode = new Node(coord1);
    let queue = [rootNode];

    let currentMv = queue.shift();
    while (currentMv) {
      if (this.checkCoordsEqual(currentMv.coord, coord2)) {
        return currentMv;
      } else {
        let possibleMoves = this.getPossibleMoves(currentMv.coord);
        possibleMoves.forEach(mv => {
          let nextMv = new Node(mv);
          nextMv.parent = currentMv;
          queue.push(nextMv);
        });
        currentMv = queue.shift();
      }
    }
  }

  getPath(node = this.root, ans = []) {
    if (!node) return;

    this.getPath(node.parent, ans);
    ans.push(node.coord);
    return ans;
  }
}

/*************/

function createHeader() {
  const header = document.createElement('header');
  const pageTitle = document.createElement('h1');
  pageTitle.textContent = 'Knights Travails';
  header.append(pageTitle);
  return header;
}

function createUI() {
  const ui = document.createElement('section');
  const startBtn = document.createElement('button');
  const randomBtn = document.createElement('button');
  const endBtn = document.createElement('button');
  const travailBtn = document.createElement('button');
  const clearBtn = document.createElement('button');

  startBtn.type = 'button';
  startBtn.textContent = 'Start Position';
  startBtn.id = 'start';
  randomBtn.type = 'button';
  randomBtn.textContent = 'Random Start';
  randomBtn.id = 'random';
  endBtn.type = 'button';
  endBtn.textContent = 'End Position';
  endBtn.id = 'end';
  travailBtn.type = 'button';
  travailBtn.textContent = 'Travail';
  travailBtn.id = 'travail';         
  clearBtn.type = 'button';
  clearBtn.textContent = 'Clear';
  clearBtn.id = 'clear';

  ui.append(startBtn, randomBtn, endBtn, travailBtn, clearBtn);
  return ui;
}

function createRowMarkers() {
  const rowMarkersContainer = document.createElement('div');
  rowMarkersContainer.classList.add('row-marker');
  for (let i = 1; i < 9; i++) {
    let row = document.createElement('div');
    row.classList.add('row-nmbr');
    row.textContent = i;
    rowMarkersContainer.prepend(row);
  }
  return rowMarkersContainer;
}
function createColumnMarkers() {
  const columnMarkersContainer = document.createElement('div');
  columnMarkersContainer.classList.add('column-marker');
  for (let i = 0; i < 8; i++) {
    let column = document.createElement('div');
    column.classList.add('column-letter');

    let letter;
    switch (i) {
      case 0:
        letter = 'A';
        break;
      case 1:
        letter = 'B';
        break;
      case 2:
        letter = 'C';
        break;
      case 3:
        letter = 'D';
        break;
      case 4:
        letter = 'E';
        break;
      case 5:
        letter = 'F';
        break;
      case 6:
        letter = 'G';
        break;
      case 7:
        letter = 'H';
    }

    column.textContent = letter;
    columnMarkersContainer.append(column);
  }
  return columnMarkersContainer;
}
function createCheckerBoard() {
  const checkerBoard = document.createElement('div');
  checkerBoard.classList.add('checker-board');
  for (let i = 0; i < 8; i++) {
    let row = document.createElement('div');
    row.classList.add('row-board');

    for (let j = 0; j < 8; j++) {
      let square = document.createElement('div');
      square.classList.add('square');
      // square.textContent = `x: ${j} y: ${i}`
      square.dataset.xCoord = j;
      square.dataset.yCoord = i;

      if (i % 2) { // Same as (i % 2 != 0)
        if (j % 2) { // Same as (j % 2 != 0)
          square.classList.add('black');
        }
      } else {
        if (j % 2 === 0) {
          square.classList.add('black');
        }
      }
        
      row.append(square);
    }
    checkerBoard.append(row)
  }

  return checkerBoard;
}
function createBoard() {
  const board = document.createElement('section');
  board.append(createRowMarkers(), createColumnMarkers(), createCheckerBoard());
  return board;
}

function createMainContent() {
  const main = document.createElement('main');
  main.append(createUI(), createBoard());
  return main;
}

const contentContainer = document.getElementById('content');
contentContainer.append(createHeader(), createMainContent());

/*************/

const userPlaceKnight = document.getElementById('start');
userPlaceKnight.addEventListener('click', () => {
  const board = document.querySelector('.checker-board');
  board.addEventListener('click', (e) => {
    console.log(e.target)
  })
})





