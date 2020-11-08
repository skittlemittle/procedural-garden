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

// items: {"name": {weight}}
function weightedRand(items) {
  let sum = 0;
  for (const i in items) {
    sum += items[i].weight;
    if (Math.random() <= sum) return i;
  }
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
  if (len !== 0) return { x: vector.x / len, y: vector.y / len };
}

export { newStack };
export { randomRange, weightedRand };
export { vectorAdd, vectorDistance, vectorSubtract, normalize };
