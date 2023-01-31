import Tree from './data-tree-class';

/* eslint-disable no-underscore-dangle */
class Knight {
  constructor(start = undefined, finish = undefined) {
    this._start = start;
    this._finish = finish;
  }

  clearData() {
    this._start = undefined;
    this._finish = undefined;
  }

  get path() {
    const kTree = new Tree(this._start, this._finish);
    const knightPath = kTree.getPath();
    return knightPath;
  }

  set start(updatedStart) {
    this._start = updatedStart;
  }

  get start() {
    return this._start;
  }

  set finish(updatedFinish) {
    this._finish = updatedFinish;
  }

  get finish() {
    return this._finish;
  }
}

const knightData = new Knight();

export default knightData;
