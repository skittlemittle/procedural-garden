// le main scene
// MIT
import * as PIXI from "pixi.js";

// import Branching from "./generators/Branching";
import newOak from "./trees/oak";

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
//       result: [
//         "F+-+[[X[[L][+L][-L]]]--X[[L][++L][--L]]]-F[-F[[L][+L][-L]]]+X[[L][+L][-L]]",
//       ],
//     },
//     {
//       condition: "F",
//       result: ["FF", "F"],
//     },
//     {
//       condition: "L",
//       result: ["[L[++L][--L]]", "L"],
//     },
//   ],
//   startLenRange: [40, 60],
//   angleRange: { min: (5 * Math.PI) / 36, max: Math.PI / 4 }, // 25 to 45 degrees lol
// });
const graphics = new PIXI.Graphics();

document.addEventListener("keydown", () => {
  graphics.clear();
  graphics.lineStyle(1, 0xffffff, 1);

  const { crown, branches } = newOak({ x: WIDTH / 2, y: HEIGHT });
  graphics.drawPolygon(crown);

  graphics.moveTo(WIDTH / 2, HEIGHT);

  branches.forEach((element) => {
    graphics.moveTo(element.x1, element.y1);
    graphics.lineTo(element.x2, element.y2);
  });

  app.stage.addChild(graphics);
});
