<template>
  <div class="child-page-container flex flex-col">
    <Header class="flex-initial" title="Wordle" />

    <main class="flex-auto mt-20 pb-20 px-4">
      <!-- config -->
      <ToggleDisplay title="Config" class="my-4 text-silver">
        <div class="flex items-center justify-between py-1 ml-5 text-white">
          <h3 class="text-1 leading-none">Quiz Mode</h3>
          <BooleanSwitch :value="enableQuiz" @click="enableQuiz = !enableQuiz" />
        </div>
        <div class="flex items-center justify-between ml-5 text-white">
          <h3 class="text-1 leading-none">Show Hints</h3>
          <BooleanSwitch :value="enableHint" @click="enableHint = !enableHint" />
        </div>
      </ToggleDisplay>

      <!-- quiz -->
      <section class="my-4" v-if="enableQuiz">
        <SemiDivider class="my-4" />
        <div class="flex my-2">
          <h2 class="text-gold mr-2"><strong>Quiz Section:</strong></h2>
          <transition appear name="fade-in-out">
            <div v-if="quizAnswer.length" class="flex">
              <div
                v-for="(char, charIndex) in quizAnswer"
                :key="charIndex"
                class="rounded-md border-0.25 w-6 h-6 mr-1 flex justify-center items-center"
              >
                <p
                  class="text-1 text-center inline leading-none"
                  :class="{ 'text-green-600': isGuessCorrect }"
                >
                  {{ isShowQuiz ? char.toUpperCase() : '?' }}
                </p>
              </div>
            </div>
          </transition>
        </div>
        <div class="flex my-2">
          <TextButton
            class="mr-2 nt:hover:bg-gold"
            title="Start"
            :handle-click="handleStartQuiz"
            :show-loading="isLoadingQuiz"
          />
          <TextButton
            class="mr-2 nt:hover:bg-gold"
            title="Show"
            :handle-click="handleShowQuiz"
            :is-disable="isShowQuiz || !quizAnswer.length"
          />
          <TextButton class="mr-2 nt:hover:bg-gold" title="Reset" :handle-click="handleResetQuiz" />
        </div>
      </section>

      <!-- inputted words -->
      <section class="mt-4">
        <SemiDivider class="my-4" />
        <h2 v-if="!hasInput">Try 'Show' or input words</h2>
        <div v-for="(word, wordIndex) in inputtedWordObj" :key="wordIndex" class="flex my-2">
          <p class="min-w-7 mr-2">{{ getOrdinalSuffixOf(wordIndex + 1) }}</p>
          <div
            v-for="(char, charIndex) in word.word"
            :key="charIndex + char"
            @click="handleChangeStatus(wordIndex, charIndex)"
            @click.right="handleChangeStatusRevise(wordIndex, charIndex)"
            class="rounded-md border-0.25 w-6 h-6 mr-1 flex justify-center items-center clickable"
            :class="{ 'pointer-events-none': isQuizMode }"
          >
            <p
              class="text-1 text-center inline leading-none"
              :class="{
                'text-yellow': char.status === 'YELLOW',
                'text-green-600': char.status === 'GREEN',
                'text-grey-250': char.status === 'GREY',
              }"
            >
              {{ char.char.toUpperCase() }}
            </p>
          </div>
          <button @click="handleRemoveWord(wordIndex)">
            <SVGBase :svg-content="cancelIcon" class="ml-1 w-3 fill-gold" />
          </button>
        </div>
      </section>

      <SemiDivider class="my-4" />

      <!-- input -->
      <section class="flex my-2">
        <input
          type="text"
          :maxlength="5"
          v-model="inputtedWord"
          @keyup.enter="handleInputEnter"
          class="bg-grey-100 dark:bg-[#888888] rounded-md mr-4 h-10 grow min-w-0 pl-4 no-outline nt:focus:shadow-0_5-grey-800 nt:focus:dark:shadow-0_5-white ta:active:shadow-0_5-grey-800 ta:active:dark:shadow-0_5-white"
        />
        <TextButton
          v-if="enableHint"
          class="mr-2 nt:hover:bg-gold"
          title="Hints"
          :handle-click="handleSubmit"
          :show-loading="isLoadingSuggestions"
        />
        <TextButton class="mr-2 nt:hover:bg-gold" title="Clear" :handle-click="handleClear" />
      </section>

      <!-- suggestions -->
      <section v-if="!isInit && enableHint">
        <SemiDivider class="my-4" />
        <h2 v-if="!hasSuggestions">No suggestions</h2>
        <div v-else>
          <h2 class="text-gold mb-2">
            <strong>Suggestions:</strong>
          </h2>
          <div class="flex mb-2">
            <h3 class="text-gold mr-2">vowels:</h3>
            <p
              v-for="vowel in ['a', 'e', 'i', 'o', 'u']"
              :key="vowel"
              class="mx-1"
              :class="{ 'line-through text-gray-500': inputtedWordsFlattenChars.includes(vowel) }"
            >
              {{ vowel }}
            </p>
          </div>
          <div v-for="group in suggestionsGroup" :key="group[0]" class="flex">
            <p class="w-6 mr-6 text-gold">{{ group[0] }} :</p>
            <div
              class="flex-auto grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-x-4 auto-rows-min"
            >
              <p
                v-for="suggestion in group[1]"
                :key="suggestion"
                class="clickable"
                :class="{
                  '!text-yellow': isMostFrequent(suggestion).value,
                  'text-gray-500': hasDuplicatedChar(suggestion),
                }"
                @click="handleClickSuggestion(suggestion)"
              >
                {{ suggestion }}
                <!--                {{ suggestion + ' ' + isMostFrequent(suggestion).value.toString().charAt(0) }}-->
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, unref, useStore } from '@nuxtjs/composition-api'
import _ from 'lodash'
import { RootState } from '~/store/types'
import SemiDivider from '~/components/SemiDivider.vue'
import { WordStatus } from '~/gen/composition'
import { WordInput } from '~/components/helper/Word'
import { CharInput } from '~/components/helper/Char'
import TextButton from '~/components/buttons/TextButton.vue'
import { cancelIcon } from '~/assets/icons'
import SVGBase from '~/components/SVGBase.vue'
import { getOrdinalSuffixOf } from '~/components/helper/string'
import ToggleDisplay from '~/components/ToggleDisplay.vue'
import BooleanSwitch from '~/components/input/BooleanSwitch.vue'

export default defineComponent({
  name: 'Wordle',

  components: { ToggleDisplay, BooleanSwitch, SemiDivider, TextButton, SVGBase },
  // layout: '',
  props: {},

  setup(props, { emit }) {
    const store = useStore<RootState>()

    // config
    const enableQuiz = ref<boolean>(true)
    const enableHint = ref<boolean>(true)

    // init
    const isInit = ref<boolean>(true)
    const inputtedWord = ref('')
    const inputtedWords = ref<WordInput[]>([])
    const inputtedWordsFlattenChars = computed(() =>
      _.uniq(
        unref(inputtedWords).flatMap(word => {
          return word.word.flatMap(char => char.char)
        }),
      ),
    )
    const inputtedWordObj = reactive(inputtedWords)
    const hasInput = computed(() => unref(inputtedWords)?.length > 0)
    const suggestions = ref<string[]>([])
    const suggestionsGroup = computed(() => {
      const group = _.groupBy(unref(suggestions), suggestion => suggestion.charAt(0))
      return Object.entries(group)
    })
    const hasSuggestions = computed(() => unref(suggestions)?.length > 0)
    const isLoadingSuggestions = ref<boolean>(false)

    // data
    const fetchWordleSuggestions = async (): Promise<string[]> => {
      isLoadingSuggestions.value = true
      const payload = {
        input: { words: inputtedWords.value },
      }
      const data = await store.dispatch('fetchWordleSuggestions', payload)
      isLoadingSuggestions.value = false
      isInit.value = false
      return data
    }

    const fetchWordleQuizWord = async (): Promise<string> => {
      isLoadingQuiz.value = true
      const data = await store.dispatch('fetchWordleQuizWord')
      isLoadingQuiz.value = false
      return data
    }
    const handleSubmit = async () => {
      const data = await fetchWordleSuggestions()
      count.value = 0
      suggestions.value = data
    }
    const hasDuplicatedChar = (word: string): boolean => {
      return new Set(word.split('')).size !== 5
    }
    const baseNumber = 10
    const frequentCharCount = computed(() => {
      if (unref(suggestions).length >= baseNumber) return {}

      const flattenCharArr = unref(suggestions).flatMap(suggestion => {
        return _.uniq(suggestion.split(''))
      })
      return _.countBy(flattenCharArr)
    })
    const count = ref(0)
    const isMostFrequent = (word: string) =>
      computed(() => {
        if (unref(suggestions).length >= baseNumber) return false

        const valueCount: number = _.uniq(word.split('')).reduce(
          (sum, char) => sum + unref(frequentCharCount)[char],
          0,
        )
        if (valueCount > unref(count)) {
          count.value = valueCount
        }

        return valueCount === unref(count)
      })

    // Quiz Mode
    const quizAnswer = ref('')
    const isQuizMode = computed(() => unref(quizAnswer).length !== 0)
    const isLoadingQuiz = ref(false)
    const isShowQuiz = ref(false)
    const isGuessCorrect = ref(false)
    const handleStartQuiz = async () => {
      handleResetQuiz() // this order is for trigger fade-in-out transition
      quizAnswer.value = await fetchWordleQuizWord()
    }
    const handleShowQuiz = () => {
      isShowQuiz.value = true
    }
    const handleResetQuiz = () => {
      quizAnswer.value = ''
      isGuessCorrect.value = false
      isShowQuiz.value = false
      handleClear()
    }
    const verifyAnswer = (guess: string) => {
      if (guess === unref(quizAnswer)) {
        isGuessCorrect.value = true
        isShowQuiz.value = true
      }
    }

    // user action
    const handleInputEnter = (e: Event) => {
      const value = (e.target as HTMLInputElement).value
      inputWord(value.toLowerCase())
    }
    const handleClickSuggestion = (suggestion: string) => {
      inputWord(suggestion.toLowerCase())
    }
    const handleRemoveWord = (wordIndex: number) => {
      removeWord(wordIndex)
    }
    const handleChangeStatus = (wordIndex: number, charIndex: number) => {
      const newWords = inputtedWords.value
      newWords[wordIndex].word[charIndex].status = rotateStatus(
        newWords[wordIndex].word[charIndex].status,
      )
      inputtedWords.value = newWords
    }
    const handleChangeStatusRevise = (wordIndex: number, charIndex: number) => {
      handleChangeStatus(wordIndex, charIndex)
      handleChangeStatus(wordIndex, charIndex)
    }
    const handleClear = () => {
      isInit.value = true
      inputtedWords.value = []
      inputtedWord.value = ''
      suggestions.value = []
    }

    // helper
    const inputWord = (wordStr: string) => {
      // a word from wordle guess should be exactly 5 chars
      if (wordStr.length !== 5 || !wordStr.match(/^[A-Za-z?]{5}$/)) {
        return
      }
      // add word
      addWord(wordStr)
      // house keep
      inputtedWord.value = ''
    }
    const addWord = (wordStr: string) => {
      const charArr = wordStr.split('')
      const answerCharArr = unref(quizAnswer).split('')
      const chars: CharInput[] = charArr.map((char: string, charIndex: number) => {
        if (unref(isQuizMode)) {
          if (answerCharArr[charIndex] === char) {
            return new CharInput(char, WordStatus.Green)
          }
          if (answerCharArr.includes(char)) {
            return new CharInput(char, WordStatus.Yellow)
          }
          return new CharInput(char, WordStatus.Grey)
        }

        // non quiz mode
        const inputGreenWordsByPosition = _.uniq(
          unref(inputtedWords).flatMap(inputtedWord => {
            const positionWord = inputtedWord.word[charIndex]
            return positionWord.status === WordStatus.Green ? positionWord.char : []
          }),
        )
        return inputGreenWordsByPosition.length === 1 && inputGreenWordsByPosition.includes(char)
          ? new CharInput(char, WordStatus.Green)
          : new CharInput(char, WordStatus.Grey)
      })
      const word: WordInput = new WordInput(chars)
      inputtedWords.value = [...inputtedWords.value, word]

      if (unref(isQuizMode)) {
        verifyAnswer(wordStr)
      }
    }
    const removeWord = (wordIndex: number) => {
      inputtedWords.value.splice(wordIndex, 1)
    }
    const rotateStatus = (currentStatus: WordStatus): WordStatus => {
      switch (currentStatus) {
        case WordStatus.Grey:
          return WordStatus.Yellow
        case WordStatus.Yellow:
          return WordStatus.Green
        case WordStatus.Green:
          return WordStatus.Grey
      }
    }

    return {
      // display
      enableQuiz,
      enableHint,
      isInit,
      cancelIcon,
      // quiz
      quizAnswer,
      isQuizMode,
      isLoadingQuiz,
      isShowQuiz,
      isGuessCorrect,
      handleStartQuiz,
      handleShowQuiz,
      handleResetQuiz,
      // input
      handleInputEnter,
      handleChangeStatus,
      handleChangeStatusRevise,
      handleRemoveWord,
      inputtedWord,
      inputtedWords,
      inputtedWordObj,
      inputtedWordsFlattenChars,
      hasInput,
      getOrdinalSuffixOf,
      // suggestion
      suggestions,
      hasSuggestions,
      handleClickSuggestion,
      suggestionsGroup,
      hasDuplicatedChar,
      isMostFrequent,
      // action
      isLoadingSuggestions,
      handleSubmit,
      handleClear,
    }
  },
})
</script>

<style scoped>
.fade-in-out-leave,
.fade-in-out-enter-to {
  opacity: 1;
}

.fade-in-out-leave-to,
.fade-in-out-enter {
  opacity: 0;
}

.fade-in-out-leave-active,
.fade-in-out-enter-active {
  transition: all 0.2s ease-out;
}
</style>
