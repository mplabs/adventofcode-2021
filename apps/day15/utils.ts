export const deepEqual = (a, b): boolean =>
  JSON.stringify(a) === JSON.stringify(b)

export function parseInput(rawInput: string): Graph {
    const graph: Graph = {}
    const width = rawInput.split(/\r?\n/)[0].length
    const height = rawInput.split(/\r?\n/).length
  
    const ensureBounds = ([x, y]: Coord): Coord | null =>
    x > -1 && x < width && y > -1 && y < height ? [x, y] : null
  
    const getNeighbors = ([x, y]: Coord): Coord[] =>
    ensureBounds([x, y]) !== null
      ? [
          ensureBounds([x, y - 1]), // N
          ensureBounds([x + 1, y]), // E
          ensureBounds([x, y + 1]), // S
          ensureBounds([x - 1, y]), // W
        ].filter((entry) => entry !== null)
      : []
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const neighbors = getNeighbors([x, y])
        graph[`${x},${y}`] = {}
        for (const neighbor of neighbors) {
          const [nx, ny] = neighbor
          graph[`${x},${y}`][`${nx},${ny}`] = Number(rawInput.charAt(nx + ny * (width + 1)))
  
        }
      }
    }
  
    return graph
  }

export interface IShortestPath {
  distance: number
  path: string[]
}

export function shortestPath(
  graph: Graph,
  initialNode: string,
  endNode: string
): IShortestPath {
  let distances = {},
    visited = [],
    node

  distances[endNode] = Infinity
  distances = { ...distances, ...graph[initialNode] }

  let parents = { endNode: null }
  for (let child in graph[initialNode]) {
    parents[child] = initialNode
  }

  while ((node = shortestDistanceNode(distances, visited))) {
    let distance: number = distances[node]
    let children: StringMap<number> = graph[node]
    for (const child in children) {
      if (String(child) === String(initialNode)) {
        continue
      } else {
        let newDistance = distance + children[child]
        if (!distances[child] || distances[child] > newDistance) {
          distances[child] = newDistance
          parents[child] = node
        }
      }
    }
    visited.push(node)
  }

  let shortestPath = [endNode]
  let parent = parents[endNode]
  while (parent) {
    shortestPath.push(parent)
    parent = parents[parent]
  }
  shortestPath.reverse()

  // return the shortest path from start node to end node & its distance
  let results = {
    distance: distances[endNode],
    path: shortestPath,
  }

  return results

  ////////

  function shortestDistanceNode(distances, visited) {
    let shortest = null

    for (let node in distances) {
      let currentIsShortest =
        shortest === null || distances[node] < distances[shortest]
      if (currentIsShortest && !visited.includes(node)) {
        shortest = node
      }
    }

    return shortest
  }
}

export function InfinityGrid = ({
  defaultFactory = (x, y) => 0,
  stringMap = {},
  load,
  parseAs
} = {})
