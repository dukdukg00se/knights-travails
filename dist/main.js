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
  randomBtn.type = 'button';
  endBtn.type = 'button';
  travailBtn.type = 'button';
  clearBtn.type = 'button';

  startBtn.textContent = 'Start Position';
  randomBtn.textContent = 'Random Start';
  endBtn.textContent = 'End Position';
  travailBtn.textContent = 'Travail';
  clearBtn.textContent = 'Clear';

  ui.append(startBtn, randomBtn, endBtn, travailBtn, clearBtn);
  return ui;
}

function createBoard() {

}

function createMainContent() {
  const main = document.createElement('main');
  main.append(createUI());
  return main;
}

const contentContainer = document.getElementById('content');
contentContainer.append(createHeader(), createMainContent());