// le main scene
// MIT
import * as PIXI from "pixi.js";

// import Branching from "./generators/Branching";
// import Lsystem from "./generators/L-system";
import SpaceColonization from "./generators/Space-colonization";

const WIDTH = 800;
const HEIGHT = 700;

const app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
  antialias: true,
  backgroundColor: 0x000000,
});
document.body.appendChild(app.view);

// render loop
app.ticker.add(() => {});

const graphics = new PIXI.Graphics();
// const Letree = new Branching({
//   startLenRange: [150, 200],
//   minBranchSize: 20,
//   bRange: [1, 3],
// });

// const Letree = new Lsystem({
//   axiom: "X",
//   rules: [
//     {
//       condition: "X",
//       result:
//         "F+-+[[X[[L][+L][-L]]]--X[[L][++L][--L]]]-F[-F[[L][+L][-L]]]+X[[L][+L][-L]]",
//     },
//     {
//       condition: "F",
//       result: "FF",
//     },
//     {
//       condition: "L",
//       result: "[L[++L][--L]]",
//     },
//   ],
//   startLenRange: [40, 60],
//   angle: (5 * Math.PI) / 36, // 25 degrees lol
// });

const Letree = new SpaceColonization();

document.addEventListener("keydown", () => {
  graphics.clear();
  const branches = Letree.generate({ x: WIDTH / 2, y: HEIGHT });
  graphics.lineStyle(1, 0xffffff, 1);

  graphics.moveTo(WIDTH / 2, HEIGHT);

  branches.forEach((element) => {
    graphics.moveTo(element.x1, element.y1);
    graphics.lineTo(element.x2, element.y2);
  });

  app.stage.addChild(graphics);
});
