
/* for storing translation and rotation states */
const newStack = () => {
  const items = [];
  return {
    depth: () => items.length,
    top: () => items[0],
    push: newTop => { items.unshift(newTop) },
    pop: () => items.shift(),
  }
}

function randomRange(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

export { newStack };
export { randomRange };