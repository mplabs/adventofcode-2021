import { readFileSync } from 'fs'

// const input = `
// 2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678`.trim()

const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')

const heightmap: number[][] = input
  .split(/\r?\n/)
  .map((line) => line.split('').map((n) => +n))

const sum = (...args) => args.reduce((p, c) => p + c, 0)

const minima = []
for (let x = 0, bounds = getBounds(); x <= bounds[0]; x++) {
  for (let y = 0; y <= bounds[1]; y++) {
    if (isLocalMinimum(x, y)) {
      minima.push({ x, y, height: valueAt(x, y) })
    }
  }
}

const riskLevels = minima.map(({ height }) => 1 + height)
console.log(
  `Part 1: The sum of the risk levels of all low points is ${sum(
    ...riskLevels
  )}`
)

const largestBasins = minima
  .map(({ x, y }) => findBasin(x, y).size)
  .sort((a, b) => b - a)
  .slice(0, 3)
const sizeProduct = largestBasins.reduce((acc, size) => acc * size)
console.log(`Part 2: The product of the size of the three largest basins is`, sizeProduct)

////////

function getBounds(): number[] {
  return [heightmap[0].length - 1, heightmap.length - 1]
}

function checkBounds(x: number, y: number): boolean {
  const bounds = getBounds()

  return x >= 0 && bounds[0] >= x && y >= 0 && bounds[1] >= y
}

function valueAt(x: number, y: number): number {
  if (!checkBounds(x, y)) {
    return undefined
  }

  return heightmap[y][x]
}

function getAdjecentIndize(x: number, y: number): number[][] {
  if (!checkBounds(x, y)) {
    throw new Error(`Out of bounds: x:${x} y:${y}`)
  }

  return [
    checkBounds(x, y - 1) && [x, y - 1], // up
    checkBounds(x, y + 1) && [x, y + 1], // down
    checkBounds(x - 1, y) && [x - 1, y], // left
    checkBounds(x + 1, y) && [x + 1, y], // right
  ].filter(Boolean)
}

function getAdjecent(x: number, y: number): number[] {
  return getAdjecentIndize(x, y).map(([x, y]) => valueAt(x, y))
}

function isLocalMinimum(x: number, y: number): boolean {
  const value = valueAt(x, y)
  const adjecent = getAdjecent(x, y)
  const minimum = Math.min(value, ...adjecent)

  return minimum === value && value !== sum(value, ...adjecent) / (adjecent.length + 1)
}

function findBasin(x: number, y: number): Set<string> {
  const basin: Set<string> = new Set()

  const _findBasin = (x, y) => {
    const adjecent = getAdjecentIndize(x, y).filter(([x, y]) => valueAt(x, y) < 9 && !basin.has(`${x},${y}`))

    if (adjecent.length > 0) {
      adjecent.forEach(([x, y]) => basin.add((`${x},${y}`)))
      adjecent.forEach(([x, y]) => _findBasin(x, y))
    }
  }
  _findBasin(x, y)
  return basin
}
