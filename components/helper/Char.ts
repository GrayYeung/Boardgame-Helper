import { Char, WordStatus } from '~/gen/composition'

export class CharInput implements Char {
  char: string
  status: WordStatus

  constructor(char: string, status: WordStatus) {
    this.char = char
    this.status = status
  }
}
