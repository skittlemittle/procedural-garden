// Generates trees by recursively making branches
// MIT
import { newStack, randomRange } from "../utils";

export default class Tree {
  constructor({
    root = { x: 0, y: 0 },
    angleRange = {
      min: -(Math.PI / 6),
      max: Math.PI / 6,
    },
    startLenRange = [100, 200],
    minBranchSize = 20,
    bRange = [1, 4],
  }) {
    this.root = root;
    this.angleRange = angleRange;
    this.startLenRange = startLenRange;
    this.minBranchSize = minBranchSize;
    this.bRange = bRange;

    this.stack = newStack();
    this.tree = []; // list of lines: {x1, y1, x2, y2}
    this.prevAngle = 0;
  }

  _branch(len, prevNode = { x: 0, y: 0 }) {
    if (len < this.minBranchSize) return;

    const angle = randomRange(this.angleRange.min, this.angleRange.max);
    const node = {
      x1: prevNode.x,
      y1: prevNode.y,
      x2: prevNode.x - len * Math.sin(angle + this.prevAngle),
      y2: prevNode.y - len * Math.cos(angle + this.prevAngle),
    };
    this.tree.push({ ...node });
    let currBase = node;

    for (let i = 0; i < randomRange(this.bRange[0], this.bRange[1]); i++) {
      this.stack.push({ pos: { ...currBase }, angle: angle });
      this._branch(len * randomRange(0.4, 1), {
        x: currBase.x2,
        y: currBase.y2,
      });
      const n = this.stack.pop();
      currBase = n.pos;
      this.prevAngle = n.angle;
    }
  }

  /* ====Public methods==== */
  generate() {
    const minL = this.startLenRange[0];
    const maxL = this.startLenRange[1];
    this.tree = [];
    this.prevAngle = 0;

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
