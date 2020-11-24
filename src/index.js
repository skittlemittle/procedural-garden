// le main scene
// draws everything
import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";
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

const camera = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 1000,
  worldHeight: 1000,
  interaction: app.renderer.plugins.interaction,
});
app.stage.addChild(camera);
camera.drag().wheel();

const state = {
  chunks: {},
  world: null,
};

// draw chunks from start to stop
function draw(start, stop) {
  for (let i = start; i <= stop; i++) {
    // clean up trash
    if (camera.children[i] && i < start && i > stop) {
      camera.removeChildAt(i).destroy({ children: true });
      state.chunks[i] = false;
    }

    if (!state.chunks[i]) {
      state.chunks[i] = state.world.chunk("R", i);
      const graphics = new PIXI.Graphics();

      const ground = state.chunks[i].ground;
      const trees = state.chunks[i].trees;

      graphics.lineStyle(3, state.chunks[i].biome.groundColor, 1);

      let moved = false;
      for (const x in ground) {
        if (!moved) graphics.moveTo(x * 1, ground[x]);
        graphics.lineTo(x * 1, ground[x]);
        moved = true;
      }
      for (const t of trees) {
        renderTree(t, graphics);
      }

      camera.addChildAt(graphics, i);
    }
  }
}

function renderTree(t, graphics) {
  graphics.lineStyle(3, t.branchColor, 1);
  t.branches.forEach((b) => {
    graphics.moveTo(b.x1, b.y1);
    graphics.lineTo(b.x2, b.y2);
  });

  graphics.lineStyle(4, t.leafColor, 1);
  if (t.leafType === "point") {
    t.leaves.forEach((l) => graphics.drawCircle(l.x, l.y, 2));
  } else {
    t.leaves.forEach((l) => {
      graphics.moveTo(l.x1, l.y1);
      graphics.lineTo(l.x2, l.y2);
    });
  }
}

/* event handling zone */
camera.addListener("moved", (e) => {
  const start = Math.floor(e.viewport.left / 800);
  const stop = Math.floor(e.viewport.right / 800);
  draw(start, stop);
});

document.addEventListener("keydown", () => {
  state.world = new World(Math.random());
  draw(0, 4);
});

window.onload = () => {
  state.world = new World(Math.random());
  draw(0, 2);
};
