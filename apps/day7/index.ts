import { readFileSync } from 'fs'

// const input = [16,1,2,0,4,2,7,1,2,14]
const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')
  .split(',')
  .map((n) => Number(n))

const min = (...args) => args.reduce((p, c) => (c < p ? c : p), Infinity)
const max = (...args) => args.reduce((p, c) => (c > p ? c : p), 0)
const sum = (...args) => args.reduce((p, c) => p + c, 0)

// # of positions
const posCount = max(...input)

;(function part1() {
  const result = []

  for (let pos = 0; pos <= posCount; pos++) {
    result[pos] = sum(...input.map((crab) => Math.abs(pos - crab)))
  }

  const fuelMinimun = min(...result)

  console.log(
    `Part 1: Position ${result.indexOf(
      fuelMinimun
    )} requres the least fuel with ${fuelMinimun}`
  )
})()
;(function () {
  const result = []

  for (let pos = 0; pos <= posCount; pos++) {
    result[pos] = sum(...input.map(getFuelConsumption(pos)))
  }

  const fuelMinimun = min(...result)

  console.log(
    `Part 2: Position ${result.indexOf(
      fuelMinimun
    )} requres the least fuel with ${fuelMinimun}`
  )

  ////////
  function getFuelConsumption(k) {
    return (xi) => (Math.pow(k - xi, 2) + Math.abs(k - xi)) / 2
  }
})()
