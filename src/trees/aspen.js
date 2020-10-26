import Lsystem from "../generators/L-system";

// tall aspen
function newAspen(root = { x: 0, y: 0 }, height) {
  const hRange = [height - 10, height + 20];
  // rules stolen from: https://ameya98.github.io/WebPPL/generative_art/
  const Tree = new Lsystem({
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
        result: ["FF"], // FF, F 
      },
      {
        condition: "L",
        result: ["[L[++L][--L]]", "L"],
      },
    ],
    shrink: 0.95,
    startLenRange: hRange,
    angleRange: { min: (5 * Math.PI) / 36, max: Math.PI / 4 }, // 25 to 45 degrees lol
  });

  const passes = 6;
  const { tree, leaves } = Tree.generate({ ...root, passes });
  return { tree, leaves };
}

export default newAspen;