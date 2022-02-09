import _ from 'lodash'
import { GraphQLContext } from '../../server'
import { Resolvers, Word } from '../../gen/types'
import {
  buildRegExp,
  getNonTriedVowels,
  getQuestionMarkSearchWords,
  getWordsPool,
  getYellowWords,
  vowelsPool,
} from '../service/wordleService'

export const WordleResolver: Resolvers<GraphQLContext> = {
  Query: {
    wordleSuggestions: (parent, args, context, info): string[] => {
      const { input } = args
      console.log('input::', input)
      const inputtedWords: Word[] = input?.words ?? []
      const wordsPool = getWordsPool()

      // init case
      if (inputtedWords.length === 0) {
        console.log('return result for init case')
        return wordsPool.filter(wordStr => {
          const charSet: string[] = _.uniq(wordStr.split(''))
          return charSet.filter(char => vowelsPool.includes(char)).length >= 3
        })
      }

      // special syntax with "?" for border search
      const searchWords = getQuestionMarkSearchWords(inputtedWords)
      if (searchWords.length > 0) {
        console.log('return result for searchWords: ', searchWords)
        return wordsPool.filter(wordStr => {
          return searchWords.every(searchWord => wordStr.includes(searchWord))
        })
      }

      const { regExp, overlappedChars } = buildRegExp(inputtedWords)
      console.log('regExp::', regExp)
      console.log('overlappedChars::', overlappedChars)
      const yellowWords = getYellowWords(inputtedWords)
      const filteredWordsPool: string[] = wordsPool.filter(wordStr => {
        const isContainAllYellow =
          yellowWords.length === 0
            ? true
            : yellowWords.every(yellowWord => wordStr.includes(yellowWord))
        // example: ans of "stand", guess result of "grass" will be _,_,G,Y,_
        const isNoDuplicatedOverlappedChar =
          overlappedChars.length === 0
            ? true
            : wordStr.split('').filter(char => overlappedChars.includes(char)).length ===
              overlappedChars.length

        return isContainAllYellow && isNoDuplicatedOverlappedChar && wordStr.match(regExp)
      })
      const nonTriedVowels = getNonTriedVowels(inputtedWords)

      // try the combination with vowel(s) first
      if (nonTriedVowels.length > 0) {
        const getNumberOfVowels = (wordStr: string) => {
          return nonTriedVowels.filter(vowel => wordStr.includes(vowel)).length
        }

        // result format: ['2': string[] ]
        const filteredWordsPoolGroupByVowelNumbers = _.groupBy(filteredWordsPool, getNumberOfVowels)

        let nonTriedNumber = nonTriedVowels.length
        while (nonTriedNumber >= 0) {
          const filterWordsPoolWithCurrentVowelNumber: string[] =
            filteredWordsPoolGroupByVowelNumbers[nonTriedNumber.toString()] ?? []

          if (filterWordsPoolWithCurrentVowelNumber.length > 0) {
            console.log('return result for nonTriedNumber of nonTriedVowels: ', nonTriedNumber)
            return filterWordsPoolWithCurrentVowelNumber
          }
          nonTriedNumber--
        }
        console.log('end for checking result with nonTriedVowels')
      }

      console.log('return words without or not including any nonTriedVowels')
      return filteredWordsPool
    },

    wordleQuizWord: (parent, args, context, info): string => {
      const wordsPool = getWordsPool()
      return <string>_.sample(wordsPool)
    },
  },
}
