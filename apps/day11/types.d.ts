type Coord = [number, number]

interface State {
  octopuses: number[][]
  flashes: number
  flashed: Coord[]
}
