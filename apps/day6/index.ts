import { readFileSync } from "fs"


;(function part1() {
  const input = [3,4,3,1,2]
  // const input = readFileSync(`${__dirname}/input.txt`, 'utf-8').split(',').map(n => Number(n))
  
  let state: number[]

  console.log(`Initial State:`, input.length)
  for (let i = 0; i < 80; i++) {
    state = step(state)
  }
  console.log(`Part 1: After 80 days:`, state.length)

  ////////
  function step(state: number[] = input): number[] {
    for (let i = 0; i < state.length; i++) {
      if (state[i] === 0) {
        state.push(9)
        state[i] = 6
      } else {
        --state[i]
      }
    }
  
    return state
  }
}())

;(function part2() {
  // const input = [3,4,3,1,2]
  const input = readFileSync(`${__dirname}/input.txt`, 'utf-8').split(',').map(n => Number(n))

  const state: number[] = new Array(9).fill(0)

  // Fill with initial fish timers
  input.forEach(fish => state[fish]++)

  // Get the sum of all elements
  const sum = (...nums) => nums.reduce((p, c) => p + c, 0)

  console.log(`Initial State:`, sum(...state))
  for (let i = 0; i < 256; i++) {
    const spawn = state.shift()
    state.push(spawn)
    state[6] += spawn
  }
  console.log(`Part 2: After 256 days:`, sum(...state))
}())
