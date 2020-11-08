// idk what tree this looks like i just called it eucalyptus
import Lsystem from "../generators/L_system";

function newEucalyptus(root = { x: 0, y: 0 }, height = 500) {
  const hRange = [height / 10, height / 10 + 20];
  // rules stolen from: https://ameya98.github.io/WebPPL/generative_art/
  // prettier-ignore
  const Tree = new Lsystem({
    axiom: "X",
    rules: [
      {
        condition: "X",
        result: {
          "F+-+[[X[[L][+L][-L]]]--X[[L][++L][--L]]]-F[-F[[L][+L][-L]]]+X[[L][+L][-L]]": {
            weight: 1
          },
        },
      },
      {
        condition: "F",
        result: {"FF": { weight: 0.70 }, "F": { weight: 0.30 }},
      },
      {
        condition: "L",
        result: {"[L[++L][--L]]": { weight: 0.6 }, "L": { weight: 0.4 }},
      },
    ],
    shrink: 0.94,
    startLenRange: hRange,
    angleRange: { min: (5 * Math.PI) / 36, max: Math.PI / 4 }, // 25 to 45 degrees lol
  });

  const passes = 6;
  const { branches, leaves } = Tree.generate({ ...root, passes });
  return { branches, leaves };
}

export default newEucalyptus;
