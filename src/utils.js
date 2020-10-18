const newStack = () => {
  const items = [];
  return {
    depth: () => items.length,
    top: () => items[0],
    push: (newTop) => {
      items.unshift(newTop);
    },
    pop: () => items.shift(),
  };
};

function randomRange(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

function vectorAdd(v1, v2) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}

function vectorSubtract(v1, v2) {
  return { x: v1.x - v2.x, y: v1.y - v2.y };
}

function vectorDistance(v1, v2) {
  return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2);
}

function normalize(vector) {
  const len = Math.sqrt(vector.x ** 2 + vector.y ** 2);
  if (len !== 0) return { x: (vector.x * 1) / len, y: (vector.y * 1) / len };
}

export { newStack };
export { randomRange };
export { vectorAdd, vectorDistance, vectorSubtract, normalize };
