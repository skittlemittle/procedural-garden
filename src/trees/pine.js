import { Polygon } from "pixi.js";
import SpaceColonization from "../generators/Space_colonization";
import { randomRange } from "../utils/misc";
import makeCrownBlob from "../utils/crownBlob";
import scatterAttractors from "../utils/scatterAttractors";

function newPine(root = { x: 0, y: 0 }, height = 500) {
  const h = Math.round(randomRange(height, height * 0.7));
  const w = Math.round(randomRange(height / 3, height / 4));

  const crown = makeCrownBlob(root.x, root.y - height, w, h, [100, 200]);
  const attractors = scatterAttractors(new Polygon(crown), w, h, {
    x: root.x,
    y: root.y - height,
  });

  const tree = new SpaceColonization({ maxDist: height });
  return {
    leafType: "point",
    leafColor: 0xcccc00,
    branchColor: 0x221306,
    ...tree.generate(root, attractors),
  };
}

export default newPine;
