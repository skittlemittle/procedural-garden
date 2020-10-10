
/* for storing translation and rotation states */
//TODO: configuration passing
const newStack = () => {
  const items = [];
  return {
    depth: () => items.length,
    top: () => items[0],
    push: newTop => { items.unshift(newTop) },
    pop: () => items.shift(),
  }
}

export { newStack };