import { readFileSync } from 'fs'
import { bitOr, column, dotMultiply, Matrix, matrix, row, size, sum, zeros } from 'mathjs'

const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')

interface Game {
  numbers: number[]
  boards: Matrix[],
  draws: Matrix[],
}

;(function part1() {
  let { numbers, boards, draws } = parseInput(input)
  
  for (const number of numbers) {
    draws = boards.map((board, i) =>
      <Matrix>bitOr(draws[i], draw(board, number))
    )
  
    const index = draws.findIndex(checkBingo)
    if (index !== -1) {
      console.log(`Part 1: The final score is: ${getSum(boards[index], draws[index], number)}`)
      break
    }
  }
})()

;(function part2() {
  let { numbers, boards, draws } = parseInput(input)
  const winners = []

  for (const number of numbers) {
    draws = boards.map((board, i) =>
      <Matrix>bitOr(draws[i], draw(board, number))
    )

    const index = draws.findIndex(checkBingo)
    const done = draws.every(checkBingo)
    if (done) {
      console.log(`Part 2: The final score is: ${getSum(boards[index], draws[index], number)}`)
      break
    }
  }
})()



////////////

function parseInput(input: string): Game {
  let numbers: number[] | string
  let boards: Matrix[] | string[] | any
  let draws: Matrix[]
  
  [numbers, ...boards] = input.split(/\r?\n\r?\n/)

  numbers = numbers.split(',').map(n => Number(n))
  boards = boards.map(board => matrix(board.split('\n').map(line => line.match(/\d+/g).map(n => Number(n)))))
  draws = boards.map((board: Matrix) => matrix(zeros(board.size())))

  return { numbers, boards, draws }
}

function draw(board: Matrix, number: number) {
  return board.map(value => +(value === number))
}

function checkBingo(input: Matrix): boolean {
  const [x, y] = input.size();

  for (let i = 0; i < x; i++) {
    if (sum(row(input, i)) === x) {
      return true;
    }
  }

  for (let i = 0; i < y; i++) {
    if (sum(column(input, i)) === y) {
      return true;
    }
  }

  return false;
}

function flipMap(draw: Matrix): Matrix {
  return draw.map(n => n === 1 ? 0 : 1)
} 

function getSum(board: Matrix, draw: Matrix, number: number): number {
  return number * sum(
    <Matrix>dotMultiply(
      board,
      flipMap(draw) // We want the unmarked numbers
    )
  )
}

function prettyPrint(input: Matrix) {
  console.log(input.toJSON())
}

