import { readFileSync } from 'fs'

// const input = [
//   '00100',
//   '11110',
//   '10110',
//   '10111',
//   '10101',
//   '01111',
//   '00111',
//   '11100',
//   '10000',
//   '11001',
//   '00010',
//   '01010'
// ]

const input: string[] = readFileSync(`${__dirname}/input.txt`, 'utf-8').split(
  /\r?\n/
)

const bitAt = (input: string, pos: number): number => +input[pos]

function mostCommon(input: string[], pos: number): number {
  let count = 0

  for (const line of input) {
    if (bitAt(line, pos)) {
      count++
    }
  }

  return +(count >= input.length / 2)
}

function leastCommon(input: string[], pos: number): number {
  let count = 0

  for (const line of input) {
    if (bitAt(line, pos)) {
      count++
    }
  }

  return +(count < input.length / 2)
}

let gamma = 0,
  epsilon = 0

for (let pos = 0; pos < 5; pos++) {
  gamma = (gamma << 1) | mostCommon(input, pos)
  epsilon = (epsilon << 1) | leastCommon(input, pos)
}

console.log(
  `gamma: ${gamma}, epsilon: ${epsilon}, power consumption: ${gamma * epsilon}`
)

const ogr = parseInt(findOGR(input), 2)
const csr = parseInt(findCSR(input), 2)

console.log(
  `oxygen generator rating: ${ogr}, CO2 scrubber rating: ${csr}, life support rating: ${
    ogr * csr
  }`
)

function findOGR(input: string[], pos: number = 0): string {
  const result = input.filter((n) => bitAt(n, pos) === mostCommon(input, pos))

  if (result.length === 1) {
    return result[0]
  }

  return findOGR(result, ++pos)
}

function findCSR(input: string[], pos: number = 0): string {
  const result = input.filter((n) => bitAt(n, pos) === leastCommon(input, pos))

  if (result.length === 1) {
    return result[0]
  }

  return findCSR(result, ++pos)
}

function dec2bin(dec: number) {
  return (dec >>> 0).toString(2)
}
