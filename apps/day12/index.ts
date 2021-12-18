import { flattenDeep } from 'lodash'
import { filterLarge, filterLargeTwice, getPath, printable } from './utils'

// const rawInput: string = `
// start-A
// start-b
// A-c
// A-b
// b-d
// A-end
// b-end`

// const rawInput: string = `
// dc-end
// HN-start
// start-kj
// dc-start
// dc-HN
// LN-dc
// HN-end
// kj-sa
// kj-HN
// kj-dc`

// const rawInput: string = `
// fs-end
// he-DX
// fs-he
// start-DX
// pj-DX
// end-zg
// zg-sl
// zg-pj
// pj-he
// RW-he
// fs-DX
// pj-RW
// zg-RW
// start-pj
// he-WI
// zg-he
// pj-fs
// start-RW`

const rawInput: string = `
QR-da
QR-end
QR-al
start-op
zh-iw
zh-start
da-PF
op-bj
iw-QR
end-HR
bj-PF
da-LY
op-PF
bj-iw
end-da
bj-zh
HR-iw
zh-op
zh-PF
HR-bj
start-PF
HR-da
QR-bj`

const input = rawInput.split(/\r?\n/).map((line) => line.split('-'))

const graph: Graph = input.reduce((acc, [a, b]) => {
  if (b !== 'start') {
    acc[a] = [...(acc[a] ?? []), b]
  }
  if (a !== 'start' && b !== 'end') {
    acc[b] = [...(acc[b] ?? []), a]
  }

  return acc
}, {})

;(function part1(graph: Graph) {
  const answer = flattenDeep(
    printable(getPath(graph, ['start'], 'start', filterLarge))
  ).filter(Boolean).length

  console.log(`Part 1: There are ${answer} paths through the cave system.`)
})(graph)
;(function part2(graph: Graph) {
  const answer = flattenDeep(
    printable(getPath(graph, ['start'], 'start', filterLargeTwice))
  ).filter(Boolean).length

  console.log(`Part 2: There are ${answer} paths through the cave system.`)
})(graph)
