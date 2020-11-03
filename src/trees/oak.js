// minecraff minecraff
import { Polygon } from "pixi.js";
import Noise from "../utils/noise";
import SpaceColonization from "../generators/Space-colonization";
import { randomRange } from "../utils/misc";

// returns a "noisy" ellipse
function makeCrownBlob(x0, y0, w, h, nRange) {
  const b = h / 2;
  const a = w / 2;
  let xoff, yoff;
  const path = [];
  const noise = new Noise();
  noise.seed(Math.random());
  for (let theta = 0; theta < 2 * Math.PI; theta += 0.01) {
    xoff = Math.cos(theta) + 1;
    yoff = Math.sin(theta) + 1;
    // https://en.wikipedia.org/wiki/Ellipse#Polar_forms
    const r =
      (a * b) /
      Math.sqrt((b * Math.cos(theta)) ** 2 + (a * Math.sin(theta)) ** 2);
    const nR =
      r + (noise.perlin(xoff, yoff) * (nRange[1] - nRange[0]) + nRange[0]);
    path.push({ x: x0 + nR * Math.cos(theta), y: y0 + nR * Math.sin(theta) });
  }
  return path;
}

function newOak(root = { x: 0, y: 0 }, height = 500) {
  const h = Math.round(randomRange(height / 2, height / 4));
  const w = Math.round(randomRange(height / 2, height / 4));
  const crown = makeCrownBlob(root.x, root.y - height, w, h, [100, 300]);

  const Tree = new SpaceColonization({
    poly: new Polygon(crown),
    w,
    h,
    center: { x: root.x, y: root.y - height },
    numLeaves: 200,
  });
  const { branches, leaves } = Tree.generate(root);
  return { branches, leaves };
}

export default newOak;
