import { Polygon } from "pixi.js";
import { randomRange } from "../utils/misc";
import SpaceColonization from "../generators/Space_colonization";
import makeCrownBlob from "../utils/crownBlob";
import scatterAttractors from "../utils/scatterAttractors";

function newAcacia(root = { x: 0, y: 0 }, height = 350) {
  const h = Math.round(randomRange(height * 0.8, height * 0.7));
  const w = Math.round(randomRange(height * 3, height));

  const crown = makeCrownBlob(root.x, root.y - height, w, h, [0, 0]);
  const attractors = scatterAttractors(
    new Polygon(crown),
    w,
    h,
    { x: root.x, y: root.y - height },
    400
  );

  const tree = new SpaceColonization({ maxDist: height });
  return {
    leafType: "point",
    leafColor: 0x6b8e23,
    branchColor: 0x97410c,
    ...tree.generate(root, attractors),
  };
}

export default newAcacia;
