export const ensureBounds = ([x, y]: Coord): Coord | null =>
  x > -1 && x < 10 && y > -1 && y < 10 ? [x, y] : null

export const getNeighbors = ([x, y]: Coord): Coord[] =>
  ensureBounds([x, y]) !== null
    ? [
        ensureBounds([x - 1, y - 1]), // NW
        ensureBounds([x, y - 1]), // N
        ensureBounds([x + 1, y - 1]), // NE
        ensureBounds([x + 1, y]), // E
        ensureBounds([x + 1, y + 1]), // SE
        ensureBounds([x, y + 1]), // S
        ensureBounds([x - 1, y + 1]), // SW
        ensureBounds([x - 1, y]), // W
      ].filter((entry) => entry !== null)
    : []

export const map = (
  octopuses: number[][],
  fn: (element: number, coord: Coord, octopuses: number[][]) => any
): any => [
  ...octopuses.map((line, y) =>
    line.map((element, x) => fn(element, [x, y], octopuses))
  ),
]
