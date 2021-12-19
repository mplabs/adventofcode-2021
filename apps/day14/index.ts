import { readFileSync } from 'fs'

// const rawInput = `
// NNCB

// CH -> B
// HH -> N
// CB -> H
// NH -> C
// HB -> C
// HC -> B
// HN -> C
// NN -> C
// BH -> H
// NC -> B
// NB -> B
// BN -> B
// BB -> N
// BC -> B
// CC -> N
// CN -> C`.trim()

const rawInput = readFileSync(`${__dirname}/input.txt`, 'utf-8')

const parseInput = (input) => {
  const [template, rulesStrings] = input.split(/\n\n/)
  const rules: Map<string, string> = new Map()

  rulesStrings.split(/\n/).forEach((rule) => {
    const [pair, replacement] = rule.split(' -> ')
    rules.set(pair, replacement)
  })

  return { template, rules }
}

const countBy = (input) =>
  input.reduce((acc, curr) => {
    if (acc[curr]) {
      ++acc[curr]
    } else {
      acc[curr] = 1
    }
    return acc
  }, {})

const sortBy = (key) => (a, b) => a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0

;(function part1({ template, rules }) {
  for (let stepNo = 1; stepNo < 11; stepNo++) {
    template = step(template, rules)
  }

  const occurences = countBy(Array.from(template))
  const ordered = <number[]>(
    Object.values(occurences).sort((a, b) => (a > b ? -1 : a === b ? 0 : 1))
  )
  const result = ordered[0] - ordered[ordered.length - 1]

  console.log(`Part 1: ${result}`)

  ////////

  function step(template: string, rules: Map<string, string>): string {
    let result = ''
    for (let pos = 0; pos < template.length; pos++) {
      const pair = `${template.charAt(pos)}${template.charAt(pos + 1)}`
      const replacement = rules.get(pair)
      result += replacement
        ? `${template.charAt(pos)}${replacement}`
        : `${template.charAt(pos)}`
    }

    return result
  }
})(parseInput(rawInput))
;(function part2({ template, rules }) {
  let map = new Map()
  for (let i = 0; i < template.length - 1; i++) {
    let pair = template[i] + template[i + 1]
    map.set(pair, (map.get(pair) || 0) + 1)
  }

  let letterCount: { [key: string]: number } = countBy(Array.from(template))
  for (let step = 1; step <= 40; step++) {
    let newMap = new Map()
    for (let [pair, quantity] of map) {
      const replacement = rules.get(pair)
      newMap.set(pair[0] + replacement, quantity + (newMap.get(pair[0] + replacement) || 0))
      newMap.set(replacement + pair[1], quantity + (newMap.get(replacement + pair[1]) || 0))
      letterCount[replacement] = (letterCount[replacement] || 0) + quantity
    }
    map = newMap
  }

  const result =  (
    Math.max(...Object.values(letterCount)) -
    Math.min(...Object.values(letterCount))
  )

  console.log(`Part 2: ${result}`)

  ////////

  let new_map = new Map()
  for (let [pair, q] of map) {
    const letter = rules.get(pair)
    new_map.set(pair[0] + letter, q + (new_map.get(pair[0] + letter) || 0))
    new_map.set(letter + pair[1], q + (new_map.get(letter + pair[1]) || 0))
    letterCount[letter] = (letterCount[letter] || 0) + q
  }
  map = new_map
})(parseInput(rawInput))
