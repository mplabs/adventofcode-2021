export const isSmallCave = (str: string): boolean => str === str.toLowerCase()

const countBy = input => input.reduce((acc, curr) => {
  if (acc[curr]) {
    ++acc[curr]
  } else {
    acc[curr] = 1
  }
  return acc
}, {})

export const max = (...args) => args.reduce((p, c) => (c > p ? c : p), 0)

export const filterLarge = (
  graph: Graph,
  seen: string[],
  step: string
): string[] =>
  graph[step].filter((n) => seen.filter(isSmallCave).indexOf(n) === -1)

export const filterLargeTwice = (
  graph: Graph,
  seen: string[],
  step: string
): string[] =>
  graph[step].filter(n => {
    const smallCaves = countBy(seen.filter(isSmallCave))
    return !smallCaves[n] || max(...Object.values(smallCaves)) === 1
  })

export function getPath(graph: Graph, seen: string[], step: string, filterFn: (graph: Graph, seen: string[], step: string) => string[]) {
  if (graph[step] === undefined) {
    return seen
  }

  const next = filterFn(graph, seen, step)
  return next.map((n) => {
    if (n === 'end') {
      let result = [...seen, n]
      return result
    } else {
      let result = getPath(graph, [...seen, n], n, filterFn)
      return result
    }
  })
}

export const printable = a => Array.isArray(a[0]) ? a.map(printable) : (a && a.length) ? a.join(',') : null
