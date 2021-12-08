import { readFileSync } from 'fs'

// const input = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`
// const input = `
// be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
// edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
// fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
// fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
// aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
// fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
// dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
// bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
// egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
// gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`.trim()
const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')

const entries: string[] = input.split(/\r?\n/)

;(function part1() {
  const buckets = Array(10).fill(0)

  entries.forEach((entry) => {
    const [_, output] = entry.split(' | ').map((p) => p.split(' '))
    
    output.forEach((value) => {
      switch (value.length) {
        case 2:
          buckets[1]++
          break

        case 3:
          buckets[7]++
          break

        case 4:
          buckets[4]++
          break

        case 7:
          buckets[8]++
          break

        default:
          break
      }
    })
  })

  const count = buckets[1] + buckets[4] + buckets[7] + buckets[8]

  console.log(`Part 1: Digits 1, 4, 7, or 8 appear ${count} times.`)
})()

;(function part2() {
  const finalCode = []
  
  entries.forEach((entry) => {
    const codes: string[] = []
    const [usp, output] = entry.split(' | ').map((p) => p.split(' '))

    // Set known numerals
    usp.forEach((code) => {
      switch (code.length) {
        case 2:
          codes[1] = code
          break

        case 3:
          codes[7] = code
          break

        case 4:
          codes[4] = code
          break

        case 7:
          codes[8] = code
          break

        default:
          break
      } 
    })

    // Six signal numerals
    usp.forEach((code) => {
      if (code.length !== 6) {
        return
      }

      if (!includeChars(code, codes[1])) {
        codes[6] = code
      } else if (includeChars(code, codes[4])) {
        codes[9] = code
      } else {
        codes[0] = code
      }
    })

    // Five signal numerals
    usp.forEach((code) => {
      if (code.length !== 5) {
        return
      }

      if (includeChars(code, codes[1])) {
        codes[3] = code;
      } else if (isFive(code, codes[6])) { // 5 has one signal less than 6
        codes[5] = code;
      } else {
        codes[2] = code;
      }
    })

    // Map output values
    let result = []
    output.forEach(code => {
      for (const [key, value] of Object.entries(codes)) {
        if (exactMatch(code, value)) {
          result.push(key);
        }
      }
    });

    finalCode.push(result.join(''))
  })

  const result = finalCode.map(n => Number(n)).reduce((acc, curr) => acc + curr, 0)
  console.log(`Part 2: The sum of all output values is`, result)
})()
// I got frustrated, so the final solution is heavily inspired by
// Teo Diaz' solution (https://github.com/TeoDiaz/Katas/blob/master/AdventOfCode/2021/Day8/Part2.js)

export function isFive(code: string, chars: string): boolean {
  if (!chars) {
    return false;
  }
  const result = [...chars].filter((c) => code.includes(c))
  
  return result.length === chars.length - 1
}

export function includeChars(code: string, chars: string): boolean {
  if (!chars) {
    return false;
  }
  const result = [...chars].filter((c) => code.includes(c))
  
  return result.length === chars.length
}

export function exactMatch(code: string, chars: string): boolean {
  return includeChars(code, chars) && code.length === chars.length
}