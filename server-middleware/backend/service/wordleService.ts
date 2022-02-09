import path from 'path'
import _ from 'lodash'
import { Char, Word, WordStatus } from '../../gen/types'
import { readFileLines } from '../helper/fs'

export const vowelsPool: string[] = ['a', 'e', 'i', 'o', 'u']

export const getWordsPool = (): string[] => {
  const filePath = path.resolve(__dirname, '../assets/txt/wordle-answers-alphabetical.txt')
  const wordsPool = readFileLines(filePath)
  if (wordsPool === undefined) {
    throw new Error('cannot get wordsPool for path: ' + filePath)
  }
  return wordsPool
}

export const getQuestionMarkSearchWords = (inputtedWords: Word[]): string[] => {
  // only check for last word
  const lastWord = inputtedWords[inputtedWords.length - 1]
  return isWordContainsQuestionMark(lastWord)
    ? lastWord.word.flatMap(char => (char.char === '?' ? [] : char.char))
    : []
}

const isWordContainsQuestionMark = (word: Word): boolean => {
  const charStrArr = word.word.map(char => char.char)
  return charStrArr.includes('?')
}

export const getNonTriedVowels = (inputtedWords: Word[]): string[] => {
  const triedWords = getTriedWords(inputtedWords)

  return _.difference(vowelsPool, triedWords)
}

export const getYellowWords = (inputtedWords: Word[]): string[] => {
  return getWords(inputtedWords, WordStatus.Yellow)
}

export const getGreyWords = (inputtedWords: Word[]): string[] => {
  return getWords(inputtedWords, WordStatus.Grey)
}

const getTriedWords = (inputtedWords: Word[]): string[] => {
  return getWords(inputtedWords, undefined)
}

export const buildRegExp = (
  inputtedWords: Word[],
): {
  regExp: RegExp
  overlappedChars: string[]
} => {
  const yellowWords: string[] = getYellowWords(inputtedWords)
  const greyWords: string[] = getGreyWords(inputtedWords)
  const overlappedChars: string[] = _.intersection(greyWords, yellowWords)
  const normalizedGreyWords: string[] = _.difference(greyWords, overlappedChars)

  const wordPositionArr = inputtedWords.reduce(
    (acc: Char[][], word) => {
      // ignore word with question mark
      if (isWordContainsQuestionMark(word)) return acc

      word.word?.map((char, index) => acc[index].push(char))
      return acc
    },
    new Array(5).fill(null).map(() => [] as Char[]),
  )

  const regExpStrArr = wordPositionArr.map(wordPosition => {
    const greenIndex = wordPosition.findIndex(char => char.status === WordStatus.Green)

    // check for Green status first, as this is define answer
    if (greenIndex !== -1) {
      return wordPosition[greenIndex].char
    }

    // check for Yellow status then, as this is extra hints on specific position
    const yellowChars = wordPosition
      .filter(char => char.status === WordStatus.Yellow)
      .map(char => char.char)
    if (yellowChars.length > 0) {
      return `[^${_.uniq([...normalizedGreyWords, ...yellowChars])
        .join('')
        .toLowerCase()}]{1}`
    }

    // return general hints of Grey status
    return `[^${_.uniq([...normalizedGreyWords])
      .join('')
      .toLowerCase()}]{1}`
  })

  return {
    regExp: new RegExp(`^${regExpStrArr.join('').toLowerCase()}$`),
    overlappedChars,
  }
}

const getWords = (inputtedWords: Word[], status?: WordStatus): string[] => {
  return inputtedWords.flatMap(word => {
    // ignore word with question mark
    if (isWordContainsQuestionMark(word)) return []

    return (
      word.word?.flatMap(char => {
        return status === undefined || char.status === status ? char.char : []
      }) ?? []
    )
  })
}
