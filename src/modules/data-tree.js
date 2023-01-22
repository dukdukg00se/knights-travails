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
      (innerArr) => innerArr.every((elem) => elem >= 0 && elem <= 7) == true
    );
  }

  checkCoordsEqual(coord1, coord2) {
    return JSON.stringify(coord1) === JSON.stringify(coord2);
  }

  buildPathTree(coord1, coord2) {
    const rootNode = new Node(coord1);
    const queue = [rootNode];

    let currentMv = queue.shift();
    while (currentMv) {
      if (this.checkCoordsEqual(currentMv.coord, coord2)) {
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
    // eslint err consistent-return no return value
    if (!node) return node;

    this.getPath(node.parent, ans);
    ans.push(node.coord);
    return ans;
  }
}

export default Tree;
