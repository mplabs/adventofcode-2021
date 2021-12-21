type Coord = [number, number]

type StringMap<T> = { [key: string]: T }

type Graph = StringMap<StringMap<number>>
