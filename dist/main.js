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
  const pickStart = document.createElement('button');
  const randomStart = document.createElement('button');
  const pickEnd = document.createElement('button');
  const randomEnd = document.createElement('button');
  const travail = document.createElement('button');
  const clear = document.createElement('button');

  pickStart.type = 'button';
  pickStart.textContent = 'Pick Start';
  pickStart.id = 'start';
  randomStart.type = 'button';
  randomStart.textContent = 'Random Start';
  randomStart.id = 'random-start';
  pickEnd.type = 'button';
  pickEnd.textContent = 'Pick End';
  pickEnd.id = 'end';
  randomEnd.type = 'button';
  randomEnd.textContent = 'Random End';
  randomEnd.id = 'random-end';
  travail.type = 'button';
  travail.textContent = 'Travail';
  travail.id = 'travail';         
  clear.type = 'button';
  clear.textContent = 'Clear';
  clear.id = 'clear';

  ui.append(pickStart, randomStart, pickEnd, randomEnd, travail, clear);
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
      // square.dataset.xCoord = j;
      // square.dataset.yCoord = i;
      square.dataset.coord = `[${j}, ${i}]`;

      let knightImg = document.createElement('img');
      knightImg.classList.add('knight');
      knightImg.src = '../src/assets/images/chess-knight.svg';

      let squareNmbr = document.createElement('h3');
      squareNmbr.classList.add('number');
      



      if (i % 2) { // Same as (i % 2 != 0)
        if (j % 2) { // Same as (j % 2 != 0)
          square.classList.add('black');
        }
      } else {
        if (j % 2 === 0) {
          square.classList.add('black');
        }
      }

      square.append(knightImg, squareNmbr);
        
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
let start;
let end;

let userBtns = document.querySelectorAll('button');
userBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let selection = e.target;
    let prevSelection = document.querySelector('.active');

    
    if (prevSelection && prevSelection.id != selection.id) {
      prevSelection.classList.remove('active');
    }

    if (selection.id === 'start') {
      selection.classList.add('active');
      logUserCoord(e);

    }

    if (selection.id === 'random-start') {
      logUserCoord(e);
      // start = JSON.parse(randomCoord());

      let startString = randomCoord(); // fn returns string data
      start = JSON.parse(startString);

      let square = document.querySelector(`[data-coord="${startString}"]`);

      let prevSq = document.querySelector('.start');
      if (prevSq) {
        if (prevSq.dataset.coord !== square.dataset.coord) {
          prevSq.classList.remove('start');
          prevSq.firstChild.style.opacity = '0';
        }
      }

      square.firstChild.style.opacity = '1';
      square.classList.add('start');


    }

    if (selection.id === 'end') {
      selection.classList.add('active');
      logUserCoord(e);

    }

    if (selection.id === 'random-end') {
      logUserCoord(e);

      let endString = randomCoord(); // fn returns string data
      end = JSON.parse(endString);

      let square = document.querySelector(`[data-coord="${endString}"]`);

      let prevSq = document.querySelector('.end');
      if (prevSq) {
        if (prevSq.dataset.coord !== square.dataset.coord) {
          prevSq.classList.remove('end');
        }
      }

      square.classList.add('end');

    }

    if (selection.id === 'travail') {

      if (start && end) {

        showPath();

        // let kTree = new Tree(start, end);

        // let knightPath = kTree.getPath();

        // for (let i = 0; i < knightPath.length; i++) {
        //   let mvString = JSON.stringify(knightPath[i]).replace(',', ', ');
        //   console.log(mvString);

        //   let square = document.querySelector(`[data-coord="${mvString}"]`);
        //   square.classList.add('end');
        //   square.firstChild.style.opacity = '1';
        //   square.lastChild.textContent = i;
        // }

        // knightPath.forEach(mvArr => {
        //   let mvString = JSON.stringify(mvArr).replace(',', ', ');;
        //   console.log(mvString);

        //   let square = document.querySelector(`[data-coord="${mvString}"]`);
        //   square.classList.add('end');
        // })
      }
      
      else {
        console.log('pick start and end')
      }

    }

  })
})


function logUserCoord(e) {
  const board = document.querySelector('.checker-board');
  
  if (e.target.id === 'start') {
    board.onclick = (e) => {

      let square = e.target.dataset.coord ? e.target : e.target.parentElement;

      let prevSq = board.querySelector('.start');
      if (prevSq) {

        if (prevSq.dataset.coord !== square.dataset.coord) {
          prevSq.classList.remove('start');
          prevSq.firstChild.style.opacity = '0';
        }
      }

      let coordArr = JSON.parse(square.dataset.coord);
      square.firstChild.style.opacity = '1';
      square.classList.add('start');

      // return coordArr;
      start = coordArr;

      // let knightImg = document.createElement('img');
      // knightImg.src = '../src/assets/images/chess-knight.svg';
      // knightImg.classList.add('knight');

      // e.target.append(knightImg);
      // e.target.classList.toggle('start');

    }

  } else if (e.target.id === 'end') {
    board.onclick = (e) => {
      // console.log(e.target)
      // console.log(board.contains(e.target))

      let square = e.target.dataset.coord ? e.target : e.target.parentElement;

      let prevSq = board.querySelector('.end');
      if (prevSq) {

        if (prevSq.dataset.coord !== square.dataset.coord) {
          prevSq.classList.remove('end');
          prevSq.firstChild.style.opacity = '0';
        }
      }

      let coordArr = JSON.parse(square.dataset.coord);
      square.classList.add('end');

      // console.log(coordArr);
      // return coordArr;
      end = coordArr;

    }
  } else {
    board.onclick = null;
  }

  // Adds listener everytime button clicked
  // Can't inspect element to find handlers 
  // board.addEventListener('click', (e) => {
  //   console.log(e.target)
  // })

  // console.dir(!!board.onclick);
  // console.dir(board);
}

function randomCoord() {
  let squares = document.querySelectorAll('.square');
  let random = Math.floor(Math.random() * 64);

  let selected = squares[random];

  let randomSquare = selected.dataset.coord;

  return randomSquare;
  // return JSON.parse(randomSquare);
}

async function showPath() {
  let kTree = new Tree(start, end);
  let knightPath = kTree.getPath();  
  
  for (let i = 0; i < knightPath.length; i++) {

    let square = await wait(knightPath[i]);    

    square.classList.add('end');
    square.firstChild.style.opacity = '1';
    square.lastChild.textContent = i;
  }
}

function wait(input) {

  return new Promise((resolve) => {
    setTimeout(() => {
      let mvString = JSON.stringify(input).replace(',', ', ');
      let square = document.querySelector(`[data-coord="${mvString}"]`);

      resolve(square);
    }, 800)
  })
}


