// Generates trees by recursively making branches
import { newStack, randomRange } from "../utils/misc";

export default class Branching {
  constructor({
    angleRange = {
      min: -(Math.PI / 6),
      max: Math.PI / 6,
    },
    startLenRange = [100, 200],
    minBranchSize = 20,
    bRange = [1, 4],
  }) {
    this.angleRange = angleRange;
    this.startLenRange = startLenRange;
    this.minBranchSize = minBranchSize;
    this.bRange = bRange;

    this.stack = newStack();
    this.tree = []; // list of lines: {x1, y1, x2, y2}
    this.prevAngle = 0;
    this.currBase;
  }

  _branch(len, prevBranch = { x: 0, y: 0 }) {
    if (len < this.minBranchSize) return;

    const angle = randomRange(this.angleRange.min, this.angleRange.max);
    const branch = {
      x1: prevBranch.x,
      y1: prevBranch.y,
      x2: prevBranch.x - len * Math.sin(angle + this.prevAngle),
      y2: prevBranch.y - len * Math.cos(angle + this.prevAngle),
    };
    this.tree.push({ ...branch });
    this.currBase = branch;

    for (let i = 0; i < randomRange(this.bRange[0], this.bRange[1]); i++) {
      this.stack.push({ pos: { ...this.currBase }, angle: angle });
      this._branch(len * randomRange(0.4, 1), {
        x: this.currBase.x2,
        y: this.currBase.y2,
      });
      const n = this.stack.pop();
      this.currBase = n.pos;
      this.prevAngle = n.angle;
    }
  }

  /* ====Public methods==== */
  generate(root = { x: 0, y: 0 }) {
    const minL = this.startLenRange[0];
    const maxL = this.startLenRange[1];
    this.tree.length = 0;
    this.prevAngle = 0;

    this.tree.push({ x1: root.x, y1: root.y, x2: root.x, y2: root.y });
    this._branch(randomRange(minL, maxL), { x: root.x, y: root.y });
    return { branches: this.tree };
  }
}
