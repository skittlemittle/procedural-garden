// le main scene
// MIT
import * as PIXI from "pixi.js";

// import Branching from "./generators/Branching";
// import newOak from "./trees/oak";
import Lsystem from "./generators/L-system";

const WIDTH = 800;
const HEIGHT = 700;

const app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
  antialias: true,
  backgroundColor: 0x000000,
});
document.body.appendChild(app.view);

// const Letree = new Branching({
//   startLenRange: [150, 200],
//   minBranchSize: 20,
//   bRange: [1, 3],
// });

const Letree = new Lsystem({
  axiom: "X",
  rules: [
    {
      condition: "X",
      result: [
        "F+-+[[X[[L][+L][-L]]]--X[[L][++L][--L]]]-F[-F[[L][+L][-L]]]+X[[L][+L][-L]]",
      ],
    },
    {
      condition: "F",
      result: ["FF", "F"],
    },
    {
      condition: "L",
      result: ["[L[++L][--L]]", "L"],
    },
  ],
  startLenRange: [60, 80],
  angleRange: { min: (5 * Math.PI) / 36, max: 5*Math.PI / 36 }, // 25 to 45 degrees lol
});
const graphics = new PIXI.Graphics();

////////////////////////////
const loader = PIXI.Loader.shared;
loader.onComplete.add(loaded);
loader.add("leef", "./assets/leaf.png");
loader.load();

let img;
function loaded() {
  const texture = loader.resources["leef"].texture;
  img = new PIXI.Sprite(texture);
  img.anchor.x = 0.5;
  img.anchor.y = 0.5;
  // app.stage.addChild(img);
  app.ticker.add(animate);
}

function animate() {
  img.x = app.renderer.screen.width / 2;
  img.y = app.renderer.screen.height / 2;
}
////////////////////////////

document.addEventListener("keydown", () => {
  graphics.clear();
  graphics.lineStyle(3, 0x00cc7c, 1);

  // const { tree, leaves } = newOak({ x: WIDTH / 2, y: HEIGHT });
  // leaves.forEach((e) => graphics.drawCircle(e.x, e.y, 2));
  const {tree, leaves} = Letree.generate({ x: WIDTH / 2, y: HEIGHT }, 4);
  leaves.forEach((e) => {
    graphics.moveTo(e.x1, e.y1);
    graphics.lineTo(e.x2, e.y2);
  });

  graphics.lineStyle(2, 0xffffff, 1);
  graphics.moveTo(WIDTH / 2, HEIGHT);

  tree.forEach((element) => {
    graphics.moveTo(element.x1, element.y1);
    graphics.lineTo(element.x2, element.y2);
  });

  app.stage.addChild(graphics);
});
