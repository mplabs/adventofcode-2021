import { readFileSync } from 'fs'

const input = [
  ...readFileSync(`${__dirname}/input.txt`, 'utf-8').matchAll(
    /^(\d+),(\d+) -> (\d+),(\d+)$/gm
  ),
].map(([_, x0, y0, x1, y1]) => [+x0, +y0, +x1, +y1])

// const input = [
//   ...`
// 0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2
// `.matchAll(/^(\d+),(\d+) -> (\d+),(\d+)$/gm),
// ].map(([_, x0, y0, x1, y1]) => [+x0, +y0, +x1, +y1])


const result = {}
function addResult(x: number, y: number): void {
  const key = `${x},${y}`
  result[key] = result[key] ? result[key] + 1 : 1
}

;(function part1() {
  input.forEach((coordinates) => {
    const [x0, y0, x1, y1] = coordinates

    // vertical
    if (x0 === x1) {
      getPointsFor(y0, y1).forEach((number) => addResult(x0, number))
    }

    // horizontal
    if (y0 === y1) {
      getPointsFor(x0, x1).forEach((number) => addResult(number, y0))
    }
  })

  console.log(`Part 1: ${Object.values(result).filter((n) => n > 1).length}`)

  /////
  function getPointsFor(p0: number, p1: number): number[] {
    const result = []
    const [a, b] = [p0, p1].sort((a, b) => a - b)

    for (let i = a; i <= b; i++) {
      result.push(i)
    }

    return result
  }
})()

;(function part2() {
  input.forEach((coordinates: number[]) => {
    const [x0, y0, x1, y1] = coordinates

    if (x0 !== x1 && y0 !== y1) {
      const dx = x0 < x1 ? 1 : -1
      const dy = y0 < y1 ? 1 : -1
      let x = x0,
          y = y0

      for (let x = x0, y = y0; true; x += dx, y += dy) {
        addResult(x, y)
        if (x === x1) {
          break
        }
      }
    }
  })
  
  console.log(`Part 2: ${Object.values(result).filter((n) => n > 1).length}`)
})()
