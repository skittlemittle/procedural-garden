import Branching from "../generators/Branching";
import { randomRange } from "../utils/misc";

function newDead(root = { x: 0, y: 0 }) {
  const tree = new Branching({
    startLen: randomRange(100, 50),
    bRange: [1, 2],
  });
  return {
    branchColor: 0x483c32,
    ...tree.generate(root),
  };
}

export default newDead;
