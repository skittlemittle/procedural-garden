import Lsystem from "../generators/L-system";

// tall "aspen"
function newEucalyptus(root = { x: 0, y: 0 }, height) {
  const hRange = [height - 10, height + 20];
  // rules stolen from: https://ameya98.github.io/WebPPL/generative_art/
  // prettier-ignore
  const Tree = new Lsystem({
    axiom: "X",
    rules: [
      {
        condition: "X",
        result: {
          "F+-+[[X[[L][+L][-L]]]--X[[L][++L][--L]]]-F[-F[[L][+L][-L]]]+X[[L][+L][-L]]": 1,
        },
      },
      {
        condition: "F",
        result: { "FF": 0.9, "F": 0.1 },
      },
      {
        condition: "L",
        result: { "[L[++L][--L]]": 0.5, "L": 0.5 },
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
