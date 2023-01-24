/* eslint-disable no-loop-func, consistent-return, class-methods-use-this */

import Node from './data-node-class';

class Tree {
  constructor(startCoord, endCoord) {
    this.root = this.buildPathTree(startCoord, endCoord);
  }

  getPossibleMoves(coord) {
    const [x, y] = coord;

    const mv1 = [x + 1, y + 2];
    const mv2 = [x + 1, y - 2];
    const mv3 = [x - 1, y + 2];
    const mv4 = [x - 1, y - 2];
    const mv5 = [x + 2, y + 1];
    const mv6 = [x + 2, y - 1];
    const mv7 = [x - 2, y + 1];
    const mv8 = [x - 2, y - 1];

    const allMvs = [mv1, mv2, mv3, mv4, mv5, mv6, mv7, mv8];
    return allMvs.filter(
      (eachMv) => eachMv.every((pos) => pos >= 0 && pos <= 7) === true
    );
  }

  isCoordsEqual(coord1, coord2 = this.endCoord) {
    return JSON.stringify(coord1) === JSON.stringify(coord2);
  }

  buildPathTree(start, end = this.endCoord) {
    const rootNode = new Node(start);
    const queue = [rootNode];

    let currentMv = queue.shift();
    while (currentMv) {
      if (this.isCoordsEqual(currentMv.coord, end)) {
        return currentMv;
      }

      const possibleMoves = this.getPossibleMoves(currentMv.coord);
      possibleMoves.forEach((mv) => {
        const nextMv = new Node(mv);
        nextMv.parent = currentMv;
        queue.push(nextMv);
      });
      currentMv = queue.shift();
    }
  }

  getPath(node = this.root, ans = []) {
    // if (!node) return;
    // Above causes eslint err consistent-return no return value
    if (!node) return node;

    this.getPath(node.parent, ans);
    ans.push(node.coord);
    return ans;
  }
}

export default Tree;
