import { getNeighbors, map } from './util'

// const input = `
// 5483143223
// 2745854711
// 5264556173
// 6141336146
// 6357385478
// 4167524645
// 2176841721
// 6882881134
// 4846848554
// 5283751526`.trim()

const input = `
6617113584
6544218638
5457331488
1135675587
1221353216
1811124378
1387864368
4427637262
6778645486
3682146745`.trim()

///////////
// 0 1 2 //
// 3 4 5 //
// 6 7 8 //
///////////

;(function part1(input) {
  let grid = input.split(/\r?\n/).map((line) => line.split('').map(Number))
  let flashes = 0

  for (let step = 0; step < 100; step++) {
    const flashed: Set<string> = new Set()
    let finished = false

    // the energy level of each octopus increases by 1
    grid = map(grid, (element) => ++element)
    
    while(!finished) {
      finished = true

      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
          if (grid[y][x] > 9 && !flashed.has(`${x}:${y}`)) {
            finished = false
            flashed.add(`${x}:${y}`)

            getNeighbors([x, y]).forEach(([x, y]) => { grid[y][x]++ })
          }
        }
      }
    }

    flashes += flashed.size

    grid = map(grid, (element) => element > 9 ? 0 : element)
  }

  console.log(`Part 1: There are ${flashes} total flashes after 100 steps.`)
})(input)

;(function part2(input) {
  let grid = input.split(/\r?\n/).map((line) => line.split('').map(Number))
  let steps = 1

  while (true) {
    const flashed: Set<string> = new Set()
    let finished = false

    // the energy level of each octopus increases by 1
    grid = map(grid, (element) => ++element)
    
    while(!finished) {
      finished = true

      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
          if (grid[y][x] > 9 && !flashed.has(`${x}:${y}`)) {
            finished = false
            flashed.add(`${x}:${y}`)

            getNeighbors([x, y]).forEach(([x, y]) => { grid[y][x]++ })
          }
        }
      }
    }

    if (flashed.size === 100) {
      console.log(`Part 2: the first step during which all octopuses flash is ${steps}.`)
      return
    }

    grid = map(grid, (element) => element > 9 ? 0 : element)
    steps++
  };
})(input)

////////

function visualize(state: number[][]): void {
  console.log(state.map((line) => line.join('')).join('\n') + '\n\n')
}
