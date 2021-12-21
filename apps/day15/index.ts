import { readFileSync } from 'fs'
import { parseInput, shortestPath } from './utils'

// const rawInput = `
// 1163751742
// 1381373672
// 2136511328
// 3694931569
// 7463417111
// 1319128137
// 1359912421
// 3125421639
// 1293138521
// 2311944581`.trim()

const rawInput = readFileSync(`${__dirname}/input.txt`, 'utf-8')

const width = rawInput.split(/\r?\n/)[0].length
const height = rawInput.split(/\r?\n/).length

;(function part1(graph) {
  const { distance } = shortestPath(graph, '0,0', `${width - 1},${height - 1}`)

  console.log(`Part 1: The lowest total risk of any path is ${distance}`)
})(parseInput(rawInput))
