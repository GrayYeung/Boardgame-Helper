<template>
  <div class="child-page-container flex flex-col">
    <Header class="flex-initial" title="亞瑟傳奇" />

    <client-only>
      <main class="flex-auto mt-20 pb-20 px-4" v-if="isClientReady">
        <!-- config -->
        <ToggleDisplay title="設置" class="my-4 text-silver">
          <div class="flex items-center justify-between pt-2 pb-1 ml-5 text-black dark:text-white">
            <h2 class="text-1 leading-none">遊戲模式</h2>
            <DropDownWrap>
              <select
                style="direction: rtl"
                v-model="gameSettingState.selectedGamePlayOption"
                class="text-gold text-1 leading-none clickable no-outline bg-transparent"
                @change="handleChangeGamePlayOption"
              >
                <option
                  v-for="option in questGamePlayOptions.values()"
                  :key="option.name"
                  :value="option.name"
                >
                  {{ option.name }}
                </option>
              </select>
            </DropDownWrap>
          </div>

          <SemiDivider class="my-1 ml-5" />

          <div class="flex items-center justify-between py-1 ml-5 text-black dark:text-white">
            <h2 class="text-1 leading-none">回合人數</h2>
            <!-- eslint-disable vue/no-v-html -->
            <span v-html="getDescription()"></span>
          </div>
        </ToggleDisplay>

        <SemiDivider class="my-4" />

        <TextButton class="my-4 nt:hover:bg-gold" title="重設" :handle-click="handleClickReset" />

        <!-- game board -->
        <table class="">
          <caption class="text-left mb-1 pl-1">進度：</caption>

          <thead>
            <tr class="text-1 leading-none font-bold-set text-center">
              <th class="border-r-0.5 border-b-0.5 border-opacity-40"></th>
              <th
                v-for="(player, playerIndex) in players"
                :key="playerIndex"
                class="pb-2 text-gold border-r-0.25 border-l-0.25 border-b-0.5 border-opacity-40"
              >
                <section class="flex items-center justify-between max-w-32">
                  <div class="flex-1 min-w-5" />
                  <input
                    v-if="onEditPlayers.includes(playerIndex)"
                    class="max-w-20 h-4 bg-transparent no-outline text-center"
                    v-model="players[playerIndex]"
                  />
                  <p v-else class="flex-initial break-all">
                    {{ player }}
                  </p>
                  <div class="flex-1">
                    <SVGBase
                      :svg-content="onEditPlayers.includes(playerIndex) ? tickIcon : editBtn"
                      class="mx-0.5 w-4 clickable fill-silver stroke-2 stroke-silver"
                      :class="{
                        'stroke-[2rem] stroke-silver': onEditPlayers.includes(playerIndex),
                      }"
                      @click.native="
                        onEditPlayers.includes(playerIndex)
                          ? handleClickConfirmEdit(playerIndex)
                          : handleClickEdit(playerIndex)
                      "
                    />
                  </div>
                </section>
              </th>
              <th class="pb-2 px-2 text-gold border-l-0.5 border-b-0.5 border-opacity-40">結果</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(round, roundIndex) in gameState" :key="roundIndex">
              <td
                class="px-2 border-t-0.25 border-r-0.5 border-opacity-40 text-silver"
                :class="{
                  'border-b-0.25': roundIndex !== gameState.length - 1,
                  '!text-yellow': determineRoundResult(roundIndex) === 'goodWins',
                  '!text-red-700': determineRoundResult(roundIndex) === 'badWins',
                }"
              >
                R{{ roundIndex + 1 }}
              </td>
              <th
                v-for="(player, playerIndex) in round"
                :key="roundIndex + playerIndex"
                class="border-opacity-40"
                :class="[
                  roundIndex === gameState.length - 1
                    ? 'border-t-0.25 border-l-0.25 border-r-0.25'
                    : 'border-0.25',
                ]"
              >
                <div class="flex">
                  <SVGBase
                    :svg-content="crownIcon"
                    class="w-8 mx-1 my-1 clickable"
                    :class="{ 'opacity-20': !player.leader }"
                    @click.native="handleClickSymbol(roundIndex, playerIndex, 'leader')"
                  />
                  <SVGBase
                    :svg-content="shieldIcon"
                    class="w-8 mx-1 my-1 clickable"
                    :class="{ 'opacity-20': !player.mission }"
                    @click.native="handleClickSymbol(roundIndex, playerIndex, 'mission')"
                  />
                  <SVGBase
                    :svg-content="fireIcon"
                    class="w-8 mx-1 my-1 clickable"
                    :class="{ 'opacity-20': !player.fire }"
                    @click.native="handleClickSymbol(roundIndex, playerIndex, 'fire')"
                  />
                </div>
                <div class="flex" v-if="gamePlayOption.enableWaterRounds.includes(roundIndex + 1)">
                  <SVGBase
                    :svg-content="gemIcon"
                    class="w-8 mx-1 my-1 clickable"
                    :class="{ 'opacity-20': !player.water }"
                    @click.native="handleClickSymbol(roundIndex, playerIndex, 'water')"
                  />
                  <SVGBase
                    :svg-content="smileIcon"
                    class="w-8 mx-1 my-1 clickable"
                    :class="{ 'opacity-20': !player.waterV }"
                    @click.native="handleClickSymbol(roundIndex, playerIndex, 'waterV')"
                  />
                  <SVGBase
                    :svg-content="evilIcon"
                    class="w-8 mx-1 my-1 clickable"
                    :class="{ 'opacity-20': !player.waterX }"
                    @click.native="handleClickSymbol(roundIndex, playerIndex, 'waterX')"
                  />
                </div>
              </th>
              <th class="border-l-0.5 border-t-0.25 border-opacity-40">
                <section class="mx-2 my-2">
                  <div class="flex items-center justify-between">
                    <SVGBase
                      :svg-content="tickIcon"
                      class="mr-2 fill-yellow w-5 stroke-[1rem] stroke-yellow"
                    />
                    <SVGBase
                      :svg-content="plusIcon"
                      class="fill-silver w-4 clickable"
                      :class="{
                        'pointer-events-none opacity-50': isReachRoundLimit(roundIndex),
                      }"
                      @click.native="handleClickRoundState(roundIndex, 'good', 1)"
                    />
                    <span class="mx-1">{{ roundResultState[roundIndex].good }}</span>
                    <SVGBase
                      :svg-content="minusIcon"
                      class="fill-silver w-4 clickable"
                      :class="{
                        'pointer-events-none opacity-50': roundResultState[roundIndex].good === 0,
                      }"
                      @click.native="handleClickRoundState(roundIndex, 'good', -1)"
                    />
                  </div>
                  <div class="flex items-center justify-between my-1">
                    <SVGBase
                      :svg-content="cancelIcon"
                      class="mr-2 fill-red-700 w-5 stroke-[0.5rem] stroke-red-700"
                    />
                    <SVGBase
                      :svg-content="plusIcon"
                      class="fill-silver w-4 clickable"
                      :class="{
                        'pointer-events-none opacity-50': isReachRoundLimit(roundIndex),
                      }"
                      @click.native="handleClickRoundState(roundIndex, 'bad', 1)"
                    />
                    <span class="mx-1">{{ roundResultState[roundIndex].bad }}</span>
                    <SVGBase
                      :svg-content="minusIcon"
                      class="fill-silver w-4 clickable"
                      :class="{
                        'pointer-events-none opacity-50': roundResultState[roundIndex].bad === 0,
                      }"
                      @click.native="handleClickRoundState(roundIndex, 'bad', -1)"
                    />
                  </div>
                </section>
              </th>
            </tr>
          </tbody>
        </table>
      </main>
    </client-only>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, unref, useStore } from '@nuxtjs/composition-api'
import _ from 'lodash'
import { RootState } from '~/store/types'
import SemiDivider from '~/components/SemiDivider.vue'
import TextButton from '~/components/buttons/TextButton.vue'
import SVGBase from '~/components/SVGBase.vue'
import ToggleDisplay from '~/components/ToggleDisplay.vue'
import BooleanSwitch from '~/components/input/BooleanSwitch.vue'
import { questGamePlayOptions } from '~/components/model/quest/QuestGamePlayOption'
import DropDownWrap from '~/components/input/DropDownWrap.vue'
import {
  crownIcon,
  fireIcon,
  shieldIcon,
  gemIcon,
  evilIcon,
  smileIcon,
  plusIcon,
  minusIcon,
  cancelIcon,
  tickIcon,
} from '~/assets/icons'
import { editBtn } from '~/assets/buttons'
import { addOrRemove } from '~/components/helper/array'
import { performClientTimeoutFunction } from '~/components/helper/performClientTimeoutFunction'

type SymbolType = 'leader' | 'mission' | 'fire' | 'water' | 'waterV' | 'waterX'
type ResultType = 'good' | 'bad'
type RoundResult = 'goodWins' | 'badWins'

export default defineComponent({
  name: 'Quest',

  components: { ToggleDisplay, BooleanSwitch, DropDownWrap, SemiDivider, TextButton, SVGBase },
  // layout: '',
  props: {},

  setup(props, { emit }) {
    const store = useStore<RootState>()
    const gameKey = 'quest'
    const defaultOption = '4A'

    /* config */
    const gameSettingStore = computed(() => store.getters.getGameSetting(gameKey))
    const setGameSettingState = () => ({
      selectedGamePlayOption: gameSettingStore?.value?.selectedGamePlayOption ?? defaultOption,
      playerNames: gameSettingStore?.value?.playerNames ?? [],
    })
    const gameSettingState = reactive(setGameSettingState())
    performClientTimeoutFunction(() => {
      Object.assign(gameSettingState, setGameSettingState())
      setGame()
      isClientReady.value = true
    })

    const gamePlayOption = computed(() =>
      questGamePlayOptions.get(gameSettingState.selectedGamePlayOption),
    )
    const playerNumber = computed(() => gamePlayOption.value?.playerNumber)
    const missionNumbers = computed(() => gamePlayOption.value?.missionNumbers)

    /* display */
    const isClientReady = ref<boolean>(false)
    const rounds = computed(() =>
      Array.from({ length: unref(missionNumbers)?.length ?? 0 }, (_, i) => i + 1),
    )
    const players = computed(() =>
      Array.from({ length: unref(playerNumber) ?? 0 }, (_, i) => i).map(i =>
        gameSettingState.playerNames.length > i
          ? gameSettingState.playerNames[i] ?? `P${i + 1}`
          : `P${i + 1}`,
      ),
    )
    const getDescription = () =>
      unref(gamePlayOption)
        ?.missionNumbers.flatMap((n, i) => {
          const isDouble = unref(gamePlayOption)?.doubleFailRounds.includes(i + 1)
          const doubleDisplay = isDouble ? '*' : ''
          const roundDisplay = `<span class="text-gold"><strong>${n}</strong></span>${doubleDisplay}`
          const isEnableWater = unref(gamePlayOption)?.enableWaterRounds.includes(i + 1)
          return isEnableWater ? [roundDisplay, '!'] : [roundDisplay]
        })
        .join('>>')

    const setGameState = () =>
      unref(rounds).map(round =>
        unref(players).map(_ => ({
          leader: false,
          mission: false,
          fire: false,
          water: false,
          waterV: false,
          waterX: false,
        })),
      )
    const gameState = ref(setGameState())
    const setRoundResultState = () =>
      unref(rounds).map(round => ({
        good: 0,
        bad: 0,
      }))
    const roundResultState = ref(setRoundResultState())
    const isReachRoundLimit = (missionNumber: number) => {
      const roundTotal = Object.values(unref(roundResultState)[missionNumber]).reduce(
        (acc, cur) => acc + cur,
      )
      const missionLimit = unref(gamePlayOption)?.missionNumbers[missionNumber] ?? 0

      return roundTotal === missionLimit
    }
    const determineRoundResult = (missionNumber: number): RoundResult | undefined => {
      const isEnableDoubleFail = unref(gamePlayOption)?.doubleFailRounds.includes(missionNumber + 1)
      const badNumber = unref(roundResultState)[missionNumber].bad

      if (badNumber >= (isEnableDoubleFail ? 2 : 1)) {
        return 'badWins'
      }

      if (isReachRoundLimit(missionNumber)) {
        return 'goodWins'
      }
    }
    const onEditPlayers = ref<number[]>([]) // handle onEdit mode

    /* control */
    const setGame = () => {
      // reassign with updated player number
      gameState.value = setGameState()

      // reset round result
      roundResultState.value = setRoundResultState()
    }
    const updateGameSettingState = () => {
      store.commit('setGameSettings', {
        key: gameKey,
        value: _.cloneDeep(gameSettingState),
      })
    }
    const handleChangeGamePlayOption = () => {
      updateGameSettingState()
      setGame()
    }
    const countSymbol = (missionNumber: number, symbol: SymbolType) =>
      unref(gameState)[missionNumber].reduce((acc, cur) => acc + (cur[symbol] ? 1 : 0), 0)
    const isSymbolReachRoundLimit = (
      missionNumber: number,
      symbol: SymbolType,
      limit: number,
    ): boolean => {
      return limit === countSymbol(missionNumber, symbol)
    }
    const checkSymbolLimit = (missionNumber: number, symbol: SymbolType) => {
      switch (symbol) {
        case 'mission':
          return isSymbolReachRoundLimit(
            missionNumber,
            symbol,
            unref(gamePlayOption)?.missionNumbers[missionNumber] ?? 0,
          )
        case 'leader':
        case 'fire':
        case 'water':
          return isSymbolReachRoundLimit(missionNumber, symbol, 1)
        case 'waterV':
          return isSymbolReachRoundLimit(
            missionNumber,
            symbol,
            1 - countSymbol(missionNumber, 'waterX'),
          )
        case 'waterX':
          return isSymbolReachRoundLimit(
            missionNumber,
            symbol,
            1 - countSymbol(missionNumber, 'waterV'),
          )
      }
    }
    const handleClickSymbol = (missionNumber: number, playerNumber: number, symbol: SymbolType) => {
      const existingValue = unref(gameState)[missionNumber][playerNumber][symbol]

      // handle mission boundary
      const isReachMissionLimit = checkSymbolLimit(missionNumber, symbol)
      if (!existingValue && isReachMissionLimit) return

      unref(gameState)[missionNumber][playerNumber][symbol] = !existingValue
    }
    const handleClickRoundState = (
      missionNumber: number,
      resultType: ResultType,
      valueChange: number,
    ) => {
      // handle boundary
      const existingValue = unref(roundResultState)[missionNumber][resultType]
      if (valueChange < 0 && existingValue === 0) return

      // handle boundary
      if (valueChange > 0 && isReachRoundLimit(missionNumber)) return

      unref(roundResultState)[missionNumber][resultType] = existingValue + valueChange
    }
    const handleClickEdit = (playerNumber: number) => {
      onEditPlayers.value = addOrRemove(unref(onEditPlayers), playerNumber)
    }
    const handleClickConfirmEdit = (playerNumber: number) => {
      // update name
      gameSettingState.playerNames[playerNumber] = unref(players)[playerNumber]
      updateGameSettingState()

      // resume
      handleClickEdit(playerNumber)
    }

    return {
      // config
      gameSettingStore,
      gameSettingState,
      // selectedGamePlayOption,
      gamePlayOption,
      playerNumber,
      missionNumbers,
      // display
      isClientReady,
      questGamePlayOptions,
      rounds,
      players,
      getDescription,
      gameState,
      roundResultState,
      isReachRoundLimit,
      determineRoundResult,
      onEditPlayers,
      editBtn,
      crownIcon,
      fireIcon,
      shieldIcon,
      gemIcon,
      evilIcon,
      smileIcon,
      plusIcon,
      minusIcon,
      cancelIcon,
      tickIcon,
      // control
      handleChangeGamePlayOption,
      handleClickReset: setGame,
      handleClickSymbol,
      handleClickRoundState,
      handleClickEdit,
      handleClickConfirmEdit,
    }
  },
})
</script>

<style scoped></style>
