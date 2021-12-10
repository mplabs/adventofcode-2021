import { readFileSync } from 'fs'

// const input = `
// [({(<(())[]>[[{[]{<()<>>
// [(()[<>])]({[<{<<[]>>(
// {([(<{}[<>[]}>{[]{[(<()>
// (((({<>}<{<{<>}{[]{[]{}
// [[<[([]))<([[{}[[()]]]
// [{[{({}]{}}([{[{{{}}([]
// {<[[]]>}<{[{[{[]{()[[[]
// [<(<(<(<{}))><([]([]()
// <{([([[(<>()){}]>(<<{{
// <{([{{}}[<[[[<>{}]]]>[]]`.trim()
const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')
const autocompleteScores = []

const lines = input.split(/\r?\n/)
const errors = lines.map(parse).filter(Boolean)

const finalScore = errors.map(e => e.char).map(calculateScore).reduce((p, c) => p + c, 0)
console.log(`Part 1: The total syntax error score is`, finalScore)

const middleAutocompleteScore = autocompleteScores.sort((a, b) => a < b ? -1 : a > b ? 1 : 0)[Math.floor(autocompleteScores.length / 2)]
console.log(`Part 2: The middle score is`, middleAutocompleteScore)

//////////

function parse(line: string, lineNum: number) {  
  const stack: string[] = []
  const _line = Array.from(line)

  for (let i = 0; i < _line.length; i++) {
    const char = _line[i]
    if (['[', '(', '{', '<'].indexOf(char) !== -1) {
      stack.push(char)
      continue
    }

    const expected = getClosing(stack.pop())
    if (char !== expected) {
      return { expected, char }
    }
  }

  if (stack.length > 0) {
    let score = 0
    for(const char of stack.map(getClosing).reverse()) {
      score *= 5
      switch (char) {
        case ')':
          score += 1
          break
        
        case ']':
          score += 2
          break
        
        case '}':
          score += 3
          break
        
        case '>':
          score += 4
          break
        default:
          throw new Error(`Cannot score '${char}`)
      }
    }
    autocompleteScores.push(score)
  }
}

function getClosing(char: string): string {
  switch(char) {
    case '[':
      return ']'
    
    case '(':
      return ')'
    
    case '{':
      return '}'
    
    case '<':
      return '>'
    
    default:
      throw new Error(`Cannot close '${char}'`)
  }
}

function calculateScore(char: string): number {
  switch(char) {
    case ')':
      return 3

    case ']':
      return 57
    
    case '}':
      return 1197
    
    case '>':
      return 25137

    default:
      throw new Error(`Cannot score '${char}.`)
  }
}
