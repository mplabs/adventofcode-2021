import { readFileSync } from 'fs'

const rawInput = readFileSync(`${__dirname}/input.txt`, 'utf-8')

const ALU = {
  w: 0,
  x: 0,
  y: 0,
  z: 0,
  _mem: [],
  _mp: 0,
  _readValue: (b) =>
    ['w', 'x', 'y', 'z'].indexOf(b) !== -1 ? ALU[b] : Number(b),
  inp: (a) => (ALU[a] = ALU._mem[ALU._mp++]),
  add: (a, b) => (ALU[a] += ALU._readValue(b)),
  mul: (a, b) => (ALU[a] *= ALU._readValue(b)),
  div: (a, b) => (ALU[a] = Math.floor(ALU[a] / ALU._readValue(b))),
  mod: (a, b) => (ALU[a] %= ALU._readValue(b)),
  eql: (a, b) => (ALU[a] = ALU._readValue(a) === ALU._readValue(b) ? 1 : 0),
  step: (instruction) => {
    const [i, ...vals] = instruction
    ALU[i](...vals)
  },
  reset: () => {
    ALU.w = 0
    ALU.x = 0
    ALU.y = 0
    ALU.z = 0
    ALU._mem = []
    ALU._mp = 0
  }
}

const parseInput = (rawInput) => rawInput
.trim()
.split(/\r?\n/)
.map((line) => line.split(' '))

;(function part1(instructions) {
  for (let mem = 99999999999999; mem > 0; mem--) {
    ALU.reset()
    ALU._mem = `${mem}`.split('').map(Number)
    for (let pc = 0; pc < instructions.length; pc++) {
      ALU.step(instructions[pc])
    }
    if (ALU.z === 0) {
      console.log(`Part 1: The largest moxel numer NOMAD accepts is ${mem}.`)
      break
    }
  }
})(parseInput(rawInput))
