// minecraff minecraff
import { Polygon } from "pixi.js";
import * as Noise from "../utils/noise";
import SpaceColonization from "../generators/Space-colonization";

// returns a "noisy" ellipse
function makeCrownBlob(x0, y0, w, h, nRange) {
  const b = h / 2;
  const a = w / 2;
  let xoff, yoff;
  const path = [];
  Noise.seed(Math.random());
  for (let theta = 0; theta < 2 * Math.PI; theta += 0.01) {
    xoff = Math.cos(theta) + 1;
    yoff = Math.sin(theta) + 1;
    // https://en.wikipedia.org/wiki/Ellipse#Polar_forms
    const r =
      (a * b) /
      Math.sqrt((b * Math.cos(theta)) ** 2 + (a * Math.sin(theta)) ** 2);
    const nR =
      r + (Noise.perlin(xoff, yoff) * (nRange[1] - nRange[0]) + nRange[0]);
    path.push({ x: x0 + nR * Math.cos(theta), y: y0 + nR * Math.sin(theta) });
  }
  return path;
}

function newOak(root = { x: 0, y: 0 }, height = 500) {
  const lwidth = 400;
  const lheight = 200;
  const crown = makeCrownBlob(root.x, root.y - height, lwidth, lheight, [
    150,
    400,
  ]);

  const Tree = new SpaceColonization({
    poly: new Polygon(crown),
    w: lwidth,
    h: lheight,
    center: { x: root.x, y: root.y - height },
    numLeaves: 200,
  });
  const { tree, leaves } = Tree.generate(root);
  return { tree, leaves };
}

export default newOak;
