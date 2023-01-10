#!/usr/bin/env node

class Node {
  constructor(coord) {
    this.coord = coord;
    this.parent = null;
  }
}

class Tree {
  constructor(startCoord, endCoord) {
    this.root = this.buildTree(startCoord, endCoord);
  }

  listMoves(coord) {
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

  coordsEq(coord1, coord2) {
    return JSON.stringify(coord1) === JSON.stringify(coord2);
  }

  buildTree(coord1, coord2) {
    if (this.coordsEq(coord1, coord2)) return new Node(coord1);

    let queue = [];

    let moves = this.listMoves(coord1);
    for (let i = 0; i < moves.length; i++) {
      let mv = new Node(moves[i]);
      mv.parent = new Node(coord1);
      queue.push(mv);
    }

    let currentMv = queue.shift();

    while (currentMv) {
      if (this.coordsEq(currentMv.coord, coord2)) {
        return currentMv;
      } else {
        moves = this.listMoves(currentMv.coord);
        for (let i = 0; i < moves.length; i++) {
          let mv = new Node(moves[i]);
          mv.parent = currentMv;
          queue.push(mv);
        }
        currentMv = queue.shift();
      }
    }
  }

  
}

let startPt = [0, 0];
let endPt = [0, 0];

let kTree = new Tree(startPt, endPt);
console.log(kTree.root);