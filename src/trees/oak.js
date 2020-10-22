// minecraff minecraff
import { Polygon } from "pixi.js";
import * as Noise from "../utils/noise";
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

function newOak(root = { x: 0, y: 0 }, height = 500) {
  const minR = 200,
    maxR = 300;
  const crown = makeLeafBlob(root.x, root.y - height, [minR, maxR]);

  const Tree = new SpaceColonization({
    poly: new Polygon(crown),
    r: maxR,
    center: { x: root.x, y: root.y - height },
    numLeaves: 200,
  });
  const branches = Tree.generate(root);
  return { crown, branches };
}

export default newOak;
