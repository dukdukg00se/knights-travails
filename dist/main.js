#!/usr/bin/env node

let startPt = [0,0];
let endPt = [3,3];

function listMoves(arr) {
  let [x,y] = arr;

  let mv1 = [x + 1, y + 2];
  let mv2 = [x + 1, y - 2];
  let mv3 = [x - 1, y + 2];
  let mv4 = [x - 1, y - 2];
  let mv5 = [x + 2, y + 1];
  let mv6 = [x + 2, y - 1];
  let mv7 = [x - 2, y + 1];
  let mv8 = [x - 2, y - 1];

  let allMvs = [mv1, mv2, mv3, mv4, mv5, mv6, mv7, mv8];
  return allMvs.filter(innerArr => innerArr.every(elem => elem >= 0 && elem <= 7) == true);
}

function coordsEqual(coord1, coord2) {
  return JSON.stringify(coord1) === JSON.stringify(coord2);
}

class Move {
  constructor(arr) {
    this.position = arr;
    this.parentCoord = null;
  }
}

if (coordsEqual(startPt, endPt)) {
  console.log('equal');
  return;
} else {
  let visited = [];
  visited.push(new Move(startPt));

  let possibleMoves = listMoves(startPt);
  let queue = possibleMoves.map(mvCoord => {
    let mvObj = new Move(mvCoord);
    mvObj.parentCoord = startPt;
    return mvObj;
  })
  
  let checkMove = queue.shift();
  while (checkMove) {
    if (coordsEqual(checkMove.position, endPt)) {
      visited.push(checkMove);
      checkMove = null;
    } else {
      visited.push(checkMove);
      possibleMoves = listMoves(checkMove.position);
      possibleMoves.forEach(mvCoord => {
        let mvNode = new Move(mvCoord);
        mvNode.parentCoord = checkMove.position;
        queue.push(mvNode);        
      })
      checkMove = queue.shift();
    }
  }

  let path = [];
  let pathNode = visited.pop();
  while (pathNode) {
    path.unshift(pathNode.position);
    
    if (pathNode.parentCoord) {
      visited.forEach(node => {
        if (coordsEqual(node.position, pathNode.parentCoord)) {
          path.unshift(node.position);
          pathNode = node;
        }
      })
    }
    
    pathNode = null;
    
  }

  console.log(path)

}