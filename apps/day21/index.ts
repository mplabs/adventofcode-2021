import { product, sum } from '@aoc/utils'


// 100 sided dice
let dieRolls = 0
const dieThrow = (): number => (dieRolls++ % 100) + 1

const nextPosition = (lastPosition) => ((lastPosition - 1 + dieThrow() + dieThrow() + dieThrow()) % 10) + 1

;(function part1() {
  let p1 = 6, s1 = 0
  let p2 = 8, s2 = 0

  while(true) {
    p1 = nextPosition(p1)
    s1 += p1
    if (s1 > 999) {
      break
    }

    p2 = nextPosition(p2)
    s2 += p2
    if (s2 > 999) {
      break
    }
  }

  console.log(`Part 1: The losing player's score times the number the die was rolled is ${(s1 < s2 ? s1 : s2) * dieRolls}`)
})()

;(function part2() {
  const _cache: Map<string, number[]> = new Map()

  // const result = dirac([4,8], [0,0], 0)
  const result = dirac([6,8], [0,0], 0)
  const winner = result[0] > result[1] ? 0 : 1
  console.log(`Part 2: The player that wins in more universes is Player ${winner} with ${result[winner]} wins.`)

  //////////

  function dirac(positions, scores, p) {
    const cacheKey = `${positions[0]}${positions[1]}${scores[0]}${scores[1]}${p}`
    if (_cache.has(cacheKey)) {
      return _cache.get(cacheKey)
    }

    const win = [0, 0]

    for (const outcomes of product([1,2,3], [1,2,3], [1,2,3])) {
      const newPositions = [...positions]
      const newScores = [...scores]

      const dieThrows = sum(...outcomes)

      newPositions[p] = (newPositions[p] + dieThrows - 1) % 10 + 1
      newScores[p] += newPositions[p]

      if (newScores[p] >= 21) {
        win[p]++
      } else {
        const pNew = (p+1) % 2
        const theWin = dirac(newPositions, newScores, pNew)
        for (let i = 0; i < 2; i++) {
          win[i] += theWin[i]
        }
      }
    }

    _cache.set(cacheKey, win)
    return win
  }
})()
