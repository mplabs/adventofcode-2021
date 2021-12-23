import { readFileSync } from 'fs'

// const rawInput = `
// on x=-20..26,y=-36..17,z=-47..7
// on x=-20..33,y=-21..23,z=-26..28
// on x=-22..28,y=-29..23,z=-38..16
// on x=-46..7,y=-6..46,z=-50..-1
// on x=-49..1,y=-3..46,z=-24..28
// on x=2..47,y=-22..22,z=-23..27
// on x=-27..23,y=-28..26,z=-21..29
// on x=-39..5,y=-6..47,z=-3..44
// on x=-30..21,y=-8..43,z=-13..34
// on x=-22..26,y=-27..20,z=-29..19
// off x=-48..-32,y=26..41,z=-47..-37
// on x=-12..35,y=6..50,z=-50..-2
// off x=-48..-32,y=-32..-16,z=-15..-5
// on x=-18..26,y=-33..15,z=-7..46
// off x=-40..-22,y=-38..-28,z=23..41
// on x=-16..35,y=-41..10,z=-47..6
// off x=-32..-23,y=11..30,z=-14..3
// on x=-49..-5,y=-3..45,z=-29..18
// off x=18..30,y=-20..-8,z=-3..13
// on x=-41..9,y=-7..43,z=-33..15
// on x=-54112..-39298,y=-85059..-49293,z=-27449..7877
// on x=967..23432,y=45373..81175,z=27513..53682`.trim()

const rawInput = readFileSync(`${__dirname}/input.txt`, 'utf-8')

interface Box {
  x0
  x1
  y0
  y1
  z0
  z1
}

interface Instruction {
  value: boolean
  coords: [number, number][]
}

function Box([[x0, x1], [y0, y1], [z0, z1]]: [number, number][]): Box {
  return { x0, x1, y0, y1, z0, z1 }
}

function parseInput(inputStr: string): Instruction[] {
  const regExp =
    /(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/

  return inputStr.split(/\r?\n/).map((line) => {
    const [, value, ...coords] = regExp.exec(line)
    const [xl, xu, yl, yu, zl, zu] = coords.map(Number)
    return {
      value: value === 'on',
      coords: [
        [xl, xu],
        [yl, yu],
        [zl, zu],
      ],
    }
  })
}

function lineOverlap(
  min0: number,
  max0: number,
  min1: number,
  max1: number
): [number, number] {
  return [Math.max(min0, min1), Math.min(max0, max1)]
}

function overlap(box, boxes) {
  return boxes
    .map((b) => {
      const overlapX = lineOverlap(box.x0, box.x1, b.x0, b.x1)
      const overlapY = lineOverlap(box.y0, box.y1, b.y0, b.y1)
      const overlapZ = lineOverlap(box.z0, box.z1, b.z0, b.z1)
      if (
        overlapX[1] - overlapX[0] >= 0 &&
        overlapY[1] - overlapY[0] >= 0 &&
        overlapZ[1] - overlapZ[0] >= 0
      ) {
        const tmpBox = Box([overlapX, overlapY, overlapZ])
        return (
          volume(tmpBox) - overlap(tmpBox, boxes.slice(1 + boxes.indexOf(b)))
        )
      } else {
        return 0
      }
    })
    .reduce((a, b) => a + b, 0)
}

function volume(box: Box) {
  return (box.x1 - box.x0 + 1) * (box.y1 - box.y0 + 1) * (box.z1 - box.z0 + 1)
}

;(function part1(instructions) {
  const result = [
    ...instructions
      .filter(({ coords }) =>
        coords.every(([lower, upper]) => -50 <= lower && upper <= 50)
      )
      .map(({ value, coords }) => ({
        value,
        coords: coords.map((c) => c.map((v) => Math.min(50, Math.max(-50, v)))),
      }))
      .reduce((acc, { value, coords }) => {
        const [[xl, xu], [yl, yu], [zl, zu]] = coords
        for (let z = zl; z <= zu; z++) {
          for (let y = yl; y <= yu; y++) {
            for (let x = xl; x <= xu; x++) {
              acc.set([x, y, z].join(), value)
            }
          }
        }

        return acc
      }, new Map())
      .values(),
  ].filter(Boolean).length

  console.log(`Part 1: ${result} cubes are on.`)
})(parseInput(rawInput))
;(function part2(instructions) {
  let countOn = 0
  const boxes = []

  instructions
    .reverse() // We go from the back here, so we don't have to worry about turning cubes off
    .forEach((instruction) => {
      const box = Box(instruction['coords'])
      instruction['value'] && (countOn += volume(box) - overlap(box, boxes))
      boxes.push(box)
    })

  console.log(`Part 2: ${countOn} cubes are on.`)
})(parseInput(rawInput))
