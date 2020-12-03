// what tree is this, i dont know
import Lsystem from "../generators/L_system";

function newOther(root = { x: 0, y: 0 }, height = 450) {
  // rules stolen from: https://ameya98.github.io/WebPPL/generative_art/
  // prettier-ignore
  const Tree = new Lsystem({
    axiom: "X",
    rules: [
      {
        condition: "X",
        result: {
          "F+[[X]-X]-F[-FL[++L][--L]]+X": {
            weight: 1,
          },
        },
      },
      {
        condition: "F",
        result: { "FF": { weight: 0.8 }, "F": {weight: 0.2} },
      },
      {
        condition: "L",
        result: {"[L[++L][--L]]": {weight: 0.5}, "L": {weight: 0.5}}
      }
    ],
    shrink: 0.93,
    angleRange: { min: (5 * Math.PI) / 36, max: Math.PI / 4 }, // 25 to 45 degrees lol
  });

  const hRange = [height / 10, height / 10 + 20];

  return {
    leafType: "line",
    leafColor: 0x649b20,
    branchColor: 0x293436,
    ...Tree.generate(root, 4, hRange),
  };
}

export default newOther;
