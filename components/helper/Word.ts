import { Word } from '~/gen/composition'
import { CharInput } from '~/components/helper/Char'

export class WordInput implements Word {
  word: CharInput[]

  constructor(word: CharInput[]) {
    this.word = word
  }
}
