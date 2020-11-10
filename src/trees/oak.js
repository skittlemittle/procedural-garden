// minecraff minecraff
import { Polygon } from "pixi.js";
import SpaceColonization from "../generators/Space_colonization";
import { randomRange } from "../utils/misc";
import makeCrownBlob from "../utils/crownBlob";
import scatterAttractors from "../utils/scatterAttractors";

const tree = new SpaceColonization();

function newOak(root = { x: 0, y: 0 }, height = 500) {
  const h = Math.round(randomRange(height / 2, height / 4));
  const w = Math.round(randomRange(h, h * 0.7));

  const crown = makeCrownBlob(root.x, root.y - height, w, h, [100, 300]);
  const attractors = scatterAttractors(new Polygon(crown), w, h, {
    x: root.x,
    y: root.y - height,
  });

  return tree.generate(root, attractors);
}

export default newOak;
