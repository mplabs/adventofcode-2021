import { readFileSync } from 'fs'

const rawInput = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`.trim()

const readInput = (input: string): { dots: coordinate[], instructions: string[] } => input.split('\n\n').map(l => l.split('\n')) 

const [dots, instructions] = rawInput.split('\n\n').map(l => l.split('\n'))

console.log({ dots, instructions })
