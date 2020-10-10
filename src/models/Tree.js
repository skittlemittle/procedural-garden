// Base tree generator
// MIT
import { Matrix } from 'pixi.js';
import { State } from '../index';

export default class Tree {
  constructor({
    root = {x: 0, y: 0},
    angleRange = {
      min: -(Math.PI / 6),
      max: Math.PI / 6
    },
    startLenRange = [50, 200],
    minBranchSize = 20,
    branchRange = [1, 4]
  }) {
    this.root = root;
    this.angleRange = angleRange;
    this.startLenRange = startLenRange;
    this.minBranchSize = minBranchSize;
    this.branchRange = branchRange;

    this.tree = []; // list of "nodes": {x, y}
    this.space = new Matrix();
    this.space.translate(this.root.x, this.root.y);
  }

  _branch(len) {
    if (len < this.minBranchSize) return;
    const angle = randomRange(this.angleRange.min, this.angleRange.max);

    // goblinesque
    const lStart = this.space.apply({x: 0, y: 0});
    const lEnd = this.space.apply({x: 0, y: -len});
    this.tree.push({
      x1: lStart.x,
      y1: lStart.y,
      x2: lEnd.x,
      y2: lEnd.y
    });
    // TRANSLATE
    this.space.translate(0, -len);
    State.trStack.push({ matrix: this.space });
    // ROTATE
    this.space.rotate(angle);
    this._branch(len * randomRange(0.4, 1));
    this.space = State.trStack.pop();
  }

  /* ====Public methods==== */
  // returns a tree
  generate() {
    const minL = this.startLenRange[0];
    const maxL = this.startLenRange[1];

    this.tree.push({
      x1: this.root.x,
      y1: this.root.y,
      x2: this.root.x,
      y2: this.root.y
    });
    this._branch(randomRange(minL, maxL));
    return this.tree;
  }
}

function randomRange(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}