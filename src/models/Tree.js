// Base tree generator
// MIT
import { State } from "../index";

export default class Tree {
  constructor({
    root = { x: 0, y: 0 },
    angleRange = {
      min: -(Math.PI / 6),
      max: Math.PI / 6,
    },
    startLenRange = [100, 200],
    minBranchSize = 20,
    branchRange = [1, 4],
  }) {
    this.root = root;
    this.angleRange = angleRange;
    this.startLenRange = startLenRange;
    this.minBranchSize = minBranchSize;
    this.branchRange = branchRange;

    this.tree = []; // list of "nodes": {x, y}
    this.currBase = { x1: -1, y1: -1, x2: -1, y2: -1 };
  }

  _branch(len, prevNode = { x: 0, y: 0 }) {
    if (len < this.minBranchSize && prevNode !== undefined) return;

    const angle = randomRange(this.angleRange.min, this.angleRange.max);
    const node = {
      x1: prevNode.x,
      y1: prevNode.y,
      x2: prevNode.x - len * Math.sin(angle),
      y2: prevNode.y - len * Math.cos(angle),
    };
    this.tree.push({ ...node });
    this.currBase = node;

    for (let i = 0; i < randomRange(1, 2); i++) {
      State.stack.push({ item: { ...this.currBase } });
      this._branch(len * 0.7, { x: this.currBase.x2, y: this.currBase.y2 });
      State.stack.pop();
      if (State.stack.top() !== undefined)
        this.currBase = State.stack.top().item;
    }
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
      y2: this.root.y,
    });
    this._branch(randomRange(minL, maxL), { x: this.root.x, y: this.root.y });
    return this.tree;
  }
}

function randomRange(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}
