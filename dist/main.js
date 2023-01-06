#!/usr/bin/env node

let startPt = [0,0];
let endPt = [3, 3];
let path = [];
let queue = [];

function moves(arr) {
  let [x,y] = arr;

  let mv1 = [x + 1, y + 2];
  let mv2 = [x + 1, y - 2];
  let mv3 = [y + 2, x + 1];
  let mv4 = [y - 2, x + 1];
  let mv5 = [x - 1, y + 2];
  let mv6 = [x - 1, y - 2];
  let mv7 = [y + 2, x - 1];
  let mv8 = [y - 2, x - 1];

  let allMvs = [mv1, mv2, mv3, mv4, mv5, mv6, mv7, mv8];
  return allMvs.filter(innerArr => innerArr.every(elem => elem >= 0 && elem <= 7) == true);
  
}

class Node {
  constructor(arr) {
    this.position = arr;
    this.moves = moves(arr);
  }
}

let startNode = new Node(startPt);
path.push(startNode.position);
startNode.moves.forEach(mv => {
  if (mv[0] == endPt[0] && mv[1] == endPt[1]) {
    path.push(mv);
  } else {
    queue.push(new Node(mv));
  }
});

if (queue.length > 0) {
  
}


console.log(queue);
// console.log('test')
// path.forEach(nde => console.log(nde.position))

// let start = [0, 0]; 

// console.log(moves(start))

/** */



// class Node {
//   constructor(arr) {
//     let [x,y] = arr;
//     this.position = arr;
//     this.mv1 = this.checkVal(x + 1, y + 2);
//     this.mv2 = this.checkVal(x + 1, y - 2);
//     this.mv3 = this.checkVal(y + 2, x + 1);
//     this.mv4 = this.checkVal(y - 2, x + 1);
//     this.mv5 = this.checkVal(x - 1, y + 2);
//     this.mv6 = this.checkVal(x - 1, y - 2);
//     this.mv7 = this.checkVal(y + 2, x - 1);
//     this.mv8 = this.checkVal(y - 2, x - 1);
//   }

//   checkVal(x,y) {
//     if (x > 7 || x < 0) return null;
//     if (y > 7 || y < 0) return null;
//     return [x,y]
//   }
// }

// class Tree {
//   constructor(arr) {
//     this.root = new Node(arr);
//   }

//   findPath(end, start = this.root) {
//     let queue = [];
//     let ans = [];
//     let node = start;

//     while (node.position[0] != end[0] && node.position[1] != end[1]) {
//       ans.push(node)

//       for (let i = 1; i < 9; i++) {
//         if (node[`mv${i}`]) {
//           // console.log(node[`mv${i}`])
//           queue.push(new Node(node[`mv${i}`]));
//         }
//       }
      
//       node = queue.shift();
//     }
    
//     return ans;
//   }

// }

// let kTree = new Tree(startPt);
// console.log(kTree.findPath(endPt));
// console.log(kTree.root);