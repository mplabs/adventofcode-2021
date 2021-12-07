import { readFileSync } from 'fs'

type Input = [string, number]

interface Pos {
  h: number
  d: number
  aim: number
}

// const input = [
//   'forward 5',
//   'down 5',
//   'forward 8',
//   'up 3',
//   'down 8',
//   'forward 2',
// ]

const input = <Input[]>readFileSync(`${__dirname}/input.txt`, 'utf-8')
  .split(/\r?\n/)
  .map((line) => <RegExpMatchArray>line.match(/(up|down|forward).(\d)/))
  .map(([_, direction, magniude]) => [direction, Number(magniude)])

function navigate(prev: Pos, [direction, magnitude]: Input): Pos {
  switch (direction) {
    case 'up':
      return {
        ...prev,
        aim: prev.aim - magnitude,
      }

    case 'down':
      return {
        ...prev,
        aim: prev.aim + magnitude,
      }

    case 'forward':
      return {
        ...prev,
        h: prev.h + magnitude,
        d: prev.d + prev.aim * magnitude,
      }

    default:
      throw new Error(`Unknown input '${direction} ${magnitude}'.`)
  }
}

const finalPos = input.reduce(navigate, { h: 0, d: 0, aim: 0 })

console.log(finalPos.h * finalPos.d)
