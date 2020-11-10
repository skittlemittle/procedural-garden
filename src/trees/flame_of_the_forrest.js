// that tree with the red flowers innit
// attractors scattered on the top of the crown ellipse
import { Polygon } from "pixi.js";
import { randomRange } from "../utils/misc";
import SpaceColonization from "../generators/Space_colonization";
import makeCrownBlob from "../utils/crownBlob";
import scatterAttractors from "../utils/scatterAttractors";

const tree = new SpaceColonization(20, 300);

function newFlame(root = { x: 0, y: 0 }, height = 400) {
  const h = Math.round(randomRange(height * 0.8, height * 0.7));
  const w = Math.round(randomRange(height * 3, height * 2));

  const crown = makeCrownBlob(root.x, root.y - height, w, h, [0, 0]);
  const attractors = scatterAttractors(
    new Polygon(crown),
    w,
    h,
    { x: root.x, y: root.y - height },
    500
  );

  return tree.generate(root, attractors);
}

export default newFlame;
