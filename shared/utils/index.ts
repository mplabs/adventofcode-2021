
export const max = (...args) => args.reduce((p, c) => (c > p ? c : p), 0)

export const min = (...args) => args.reduce((p, c) => (c < p ? c : p), Infinity)

// Cartesian product
export const product = (...input) => input.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))

export const sum = (...args) => args.reduce((acc, curr) => acc + curr, 0)
