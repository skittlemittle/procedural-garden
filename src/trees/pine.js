import { Polygon } from "pixi.js";
import SpaceColonization from "../generators/Space_colonization";
import makeCrownBlob from "../utils/crownBlob";
import { randomRange } from "../utils/misc";

function newPine(root = { x: 0, y: 0 }, height = 500) {
  const h = Math.round(randomRange(height, height * 0.7));
  const w = Math.round(randomRange(height / 3, height / 4));
  const crown = makeCrownBlob(root.x, root.y - height, w, h, [100, 200]);

  const tree = new SpaceColonization({
    poly: new Polygon(crown),
    w,
    h,
    center: { x: root.x, y: root.y - height },
    numLeaves: 200,
  });
  return tree.generate(root);
}

export default newPine;
