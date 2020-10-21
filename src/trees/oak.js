// minecraff minecraff
import { Polygon } from "pixi.js";
import * as Noise from "../utils/noise";
import { randomRange } from "../utils/utils";
import SpaceColonization from "../generators/Space-colonization";

// returns a "noisy" circle around an origin
function makeLeafBlob(originX, originY, nRange = []) {
  Noise.seed(Math.random());
  const path = [];
  let xoff = 0,
    yoff = 0;
  for (let i = 0; i < 2 * Math.PI; i += 0.01) {
    xoff = Math.cos(i) + 1;
    yoff = Math.sin(i) + 1;
    let r = Noise.perlin(xoff, yoff) * (nRange[1] - nRange[0]) + nRange[0];
    path.push({ x: originX + r * Math.cos(i), y: originY + r * Math.sin(i) });
  }
  return path;
}

// scatter leaf attractors in a given polygon
function scatterLeaves(leafBlob, r, center, numLeaves = 300) {
  const leaves = [];
  for (let i = 0; i < numLeaves; i++) {
    const angle = randomRange(0, 2 * Math.PI);
    const dist = Math.sqrt(Math.random()) * r; // we want an even distribution
    const leaf = {
      x: dist * Math.cos(angle) + center.x,
      y: dist * Math.sin(angle) + center.y,
    };
    if (leafBlob.contains(leaf.x, leaf.y)) leaves.push(leaf);
  }
  return leaves;
}

function newOak(root = { x: 0, y: 0 }, height = 400) {
  const minR = 200,
    maxR = 300;
  const crown = makeLeafBlob(root.x, root.y - height, [minR, maxR]);
  const leaves = scatterLeaves(new Polygon(crown), maxR, {
    x: root.x,
    y: root.y - height,
  });
  const Tree = new SpaceColonization();
  const branches = Tree.generate(root, leaves);
  return { crown, branches };
}

export default newOak;
