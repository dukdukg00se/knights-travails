/* eslint-disable no-lonely-if */

function createHeader() {
  const header = document.createElement('header');
  const pageTitle = document.createElement('h1');
  pageTitle.textContent = 'Knights Travails';
  header.append(pageTitle);
  return header;
}

function createBtnsPanel() {
  const panel = document.createElement('section');
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

  panel.append(pickStart, randomStart, pickEnd, randomEnd, travail, clear);
  return panel;
}

function createGameBoard() {
  const board = document.createElement('section');
  const createRowMarkers = () => {
    const rowMarkersContainer = document.createElement('div');
    rowMarkersContainer.classList.add('row-marker');
    for (let i = 1; i < 9; i += 1) {
      const row = document.createElement('div');
      row.classList.add('row-nmbr');
      row.textContent = i;
      rowMarkersContainer.prepend(row);
    }
    return rowMarkersContainer;
  };
  const createColumnMarkers = () => {
    const columnMarkersContainer = document.createElement('div');
    columnMarkersContainer.classList.add('column-marker');
    for (let i = 0; i < 8; i += 1) {
      const column = document.createElement('div');
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
        default: // case 7
          letter = 'H';
      }

      column.textContent = letter;
      columnMarkersContainer.append(column);
    }
    return columnMarkersContainer;
  };
  const createCheckerBoard = () => {
    const checkerBoard = document.createElement('div');
    checkerBoard.classList.add('checker-board');
    for (let i = 0; i < 8; i += 1) {
      const row = document.createElement('div');
      row.classList.add('row-board');

      for (let j = 0; j < 8; j += 1) {
        const square = document.createElement('div');
        square.classList.add('square');
        // square.textContent = `x: ${j} y: ${i}`
        // square.dataset.xCoord = j;
        // square.dataset.yCoord = i;
        square.dataset.coord = `[${j}, ${i}]`;

        const knightImg = document.createElement('img');
        knightImg.classList.add('knight');
        knightImg.src = '../src/assets/images/chess-knight.svg';

        const squareNmbr = document.createElement('h3');
        squareNmbr.classList.add('number');

        if (i % 2) {
          // Same as (i % 2 != 0)
          if (j % 2) {
            // Same as (j % 2 != 0)
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
      checkerBoard.append(row);
    }
    return checkerBoard;
  };

  board.append(createRowMarkers(), createColumnMarkers(), createCheckerBoard());
  return board;
}

function createMainContent() {
  const main = document.createElement('main');
  main.append(createBtnsPanel(), createGameBoard());
  return main;
}

export { createHeader, createMainContent };
