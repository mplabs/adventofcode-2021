import { readFileSync } from 'fs'

// const rawInput = `
// 6,10
// 0,14
// 9,10
// 0,3
// 10,4
// 4,11
// 6,0
// 6,12
// 4,1
// 0,13
// 10,12
// 3,4
// 3,0
// 8,4
// 1,10
// 2,14
// 8,10
// 9,0

// fold along y=7
// fold along x=5`.trim()

const rawInput = readFileSync(`${__dirname}/input.txt`, 'utf-8')

const readInput = (
  input: string
): { dots: Set<string>; instructions: string[] } => {
  const [dots, instructions] = input.split('\n\n').map((l) => l.split('\n'))

  return { dots: new Set(dots), instructions }
}

const fold = (dots: Set<string>, foldBy: number, axis: string): Set<string> => {
  let result: Set<string> = new Set()

  for (const dot of dots) {
    const [x, y] = dot.split(',').map(Number)
    if (axis === 'x' && x > foldBy) {
      result.add(`${2 * foldBy - x},${y}`)
    } else if (axis === 'y' && y > foldBy) {
      result.add(`${x},${2 * foldBy - y}`)
    } else {
      result.add(`${x},${y}`)
    }
  }

  return result
}

const chunk = (input, size) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
}

function display(dots: Set<string>): string {
  const maxX = [...dots].reduce((acc, dot) => {
    const [x] = dot.split(',').map(Number)
    return x > acc ? x : acc
  }, 0)

  const maxY = [...dots].reduce((acc, dot) => {
    const [_, y] = dot.split(',').map(Number)
    return y > acc ? y : acc
  }, 0)

  const result = new Array((maxX + 1) * (maxY + 1)).fill('·')
  for (let dot of dots) {
    const [x, y] = dot.split(',').map(Number)
    result[x + y * (maxX + 1)] = 'X'
  }

  return chunk(result, maxX + 1).map(line => line.join(' ')).join('\n')
}

;(function part1({ dots, instructions }) {
  const [_, axis, foldBy] = instructions[0].match(/([x,y])=(\d+)/)
  const result = fold(dots, +foldBy, axis)

  console.log(`Part 1: ${result.size} dots are visible after the first fold`)
})(readInput(rawInput))

;(function part2({ dots, instructions }) {
  for(let instruction of instructions) {
    const [_, axis, foldBy] = instruction.match(/([x,y])=(\d+)/)
    dots = fold(dots, +foldBy, axis)
  }
  
  console.log(`Part 2: The code to activate the infrared thermal imaging camera system is:
${display(dots)}`)
})(readInput(rawInput))
