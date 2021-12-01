import { readFileSync } from 'fs'

const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')
  .split(/\r?\n/)
  .map((str) => Number(str))

const countIncreased = (input: number[]) =>
  input.reduce(
    (prev, curr, idx, arr) =>
      arr[idx - 1] && arr[idx - 1] < arr[idx] ? prev + 1 : prev,
    0
  )

function slidingWindow(input: number[]): number[] {
  const output = []

  for (let window, i = 0; i < input.length - 2; i++) {
    window = input.slice(i, i + 3)
    output.push(window.reduce((p, c) => p + c, 0))
  }

  return output
}

console.log(countIncreased(slidingWindow(input)))
