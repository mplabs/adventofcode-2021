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

function getAdjecent(x: number, y: number): number[] {
  if (!checkBounds(x, y)) {
    throw new Error(`Out of bounds: x:${x} y:${y}`)
  }

  return [
    valueAt(x, y - 1), // up
    valueAt(x, y + 1), // down
    valueAt(x - 1, y), // left
    valueAt(x + 1, y), // right
  ].filter((n) => n !== undefined)
}

function isLocalMinimum(x: number, y: number): boolean {
  const value = valueAt(x, y)
  const adjecent = getAdjecent(x, y)
  const minimum = Math.min(value, ...adjecent)

  return minimum === value && value !== sum(value, ...adjecent) / (adjecent.length + 1)
}

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
