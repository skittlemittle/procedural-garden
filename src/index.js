// le main scene
// draws everything

import * as PIXI from "pixi.js";

import World from "./terrain/makeWorld";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
  antialias: true,
  backgroundColor: 0x000000,
});
document.body.appendChild(app.view);

// ghetto drawing loop
document.addEventListener("keydown", () => {
  const chunks = {};
  const world = new World(5, Math.random());

  for (let i = 0; i < 2; i++) {
    // clean up trash
    if (app.stage.children[i]) {
      app.stage.removeChildAt(i).destroy({ children: true });
    }

    chunks[i] = world.chunk("R", i);
    // container mans innit
    const graphics = new PIXI.Graphics();

    const ground = chunks[i].ground;
    const trees = chunks[i].trees;

    graphics.lineStyle(3, chunks[i].biome.groundColor, 1);

    let moved = false;
    for (const x in ground) {
      if (!moved) graphics.moveTo(x * 1, ground[x]);
      graphics.lineTo(x * 1, ground[x]);
      moved = true;
    }
    for (const t of trees) {
      drawTree(t, graphics);
    }

    app.stage.addChildAt(graphics, i);
  }
});

function drawTree(t, graphics) {
  graphics.lineStyle(4, t.leafColor, 1);
  if (t.leafType === "point") {
    t.leaves.forEach((l) => graphics.drawCircle(l.x, l.y, 2));
  } else {
    t.leaves.forEach((l) => {
      graphics.moveTo(l.x1, l.y1);
      graphics.lineTo(l.x2, l.y2);
    });
  }

  graphics.lineStyle(3, t.branchColor, 1);
  t.branches.forEach((b) => {
    graphics.moveTo(b.x1, b.y1);
    graphics.lineTo(b.x2, b.y2);
  });
}
