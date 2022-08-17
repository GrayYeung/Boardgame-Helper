import { includes, isEqual, shuffle, uniq, sum } from 'lodash'

export const shuffleArray = <T>(array: T[]): T[] => {
  // return array.sort(() => Math.random() - 0.5)
  return shuffle(array)
}

export const getRandomItemFromArray = <T>(array: T[]): T => {
  return shuffleArray(array)[0]
}

export function addOrRemove<T>(arr: T[], value: T): T[] {
  let result: T[]
  if (includes(arr, value)) {
    result = arr.filter(it => !isEqual(it, value))
  } else {
    result = [...arr, value]
  }
  return uniq(result)
}

export function upsert<T>(
  arr: T[],
  value: T,
  predicate: (v: T, i: number, arr: T[]) => unknown,
): T[] {
  const index = arr.findIndex(predicate)
  if (index === -1) {
    arr.push(value)
  } else {
    arr[index] = value
  }
  return arr
}

export const sumMatrix = (matrix: number[][]): number[] => {
  const sum = (reducer: number[], accumulator: number[]) => {
    return reducer.map((value: number, index: number) => {
      return value + accumulator[index]
    })
  }

  return matrix.reduce(sum)
}

export const range = (start: number, end: number, step: number = 1): number[] => {
  const result: number[] = []
  let temp = 0

  do {
    const value = (result.length + 1) * step
    result.push(value)
    temp += step
  } while (temp < end)

  return result
}

export const sumArray = (arr: number[]): number => {
  return sum(arr)
}
