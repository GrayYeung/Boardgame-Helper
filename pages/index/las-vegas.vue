<template>
  <div class="child-page-container flex flex-col">
    <Header class="flex-initial" title="拉斯維加斯" />

    <main class="flex-auto mt-20 pt-4 pb-20 px-4 flex flex-col space-y-4">
      <!-- config -->
      <ToggleDisplay title="Config" class="text-silver">
        <div id="configs-container" class="pt-2 ml-5 flex flex-col space-y-1">
          <div
            v-for="(enableSector, index) in enableSectorList"
            :key="index"
            class="flex items-center justify-between text-black dark:text-white"
          >
            <h3 class="text-1 leading-none">Sector {{ index + 1 }}</h3>
            <BooleanSwitch
              :value="enableSector.value"
              @click="enableSector.value = !enableSector.value"
            />
          </div>
          <div class="flex items-center justify-between text-black dark:text-white">
            <h3 class="text-1 leading-none">Allow Repeat</h3>
            <BooleanSwitch :value="allowRepeat" @click="allowRepeat = !allowRepeat" />
          </div>
        </div>
      </ToggleDisplay>

      <SemiDivider class="flex-shrink-0" />

      <section class="flex">
        <TextButton class="mr-2 nt:hover:bg-gold" title="Shuffle" :handle-click="handleShuffle" />
      </section>

      <section>
        <div v-for="(tilesInRound, roundIndex) in tiles" :key="roundIndex" class="mb-4">
          <h3 class="text-gold">第{{ roundIndex + 1 }}回合 :</h3>
          <transition appear name="fade-in-out">
            <table>
              <thead>
                <tr class="text-silver">
                  <th class="border-0.5 border-opacity-40 px-2">賭場</th>
                  <th class="border-0.5 border-opacity-40 px-2">板塊編號</th>
                  <th class="border-0.5 border-opacity-40 px-4">板塊名稱</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tile, tileIndex) in tilesInRound" :key="tileIndex">
                  <th class="border-0.5 border-opacity-40">{{ tileIndex + 1 }}</th>
                  <th class="border-0.5 border-opacity-40">
                    {{ tile === null ? '-' : tile.tile + tile.side }}
                  </th>
                  <th class="border-0.5 border-opacity-40">
                    {{ tile === null ? '-' : tile.name }}
                  </th>
                </tr>
              </tbody>
            </table>
          </transition>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { without } from 'lodash'
import SemiDivider from '~/components/SemiDivider.vue'
import TextButton from '~/components/buttons/TextButton.vue'
import SVGBase from '~/components/SVGBase.vue'
import ToggleDisplay from '~/components/ToggleDisplay.vue'
import BooleanSwitch from '~/components/input/BooleanSwitch.vue'
import { LasVegasTile, lasVegasTiles } from '~/components/model/las-vegas-royale/LasVegasTile'
import { getRandomItemFromArray } from '~/components/helper/array'

export default defineComponent({
  name: 'LasVegas',

  components: { ToggleDisplay, BooleanSwitch, SemiDivider, TextButton, SVGBase },
  // layout: '',
  props: {},

  setup(props, { emit }) {
    const roundNumber = 3

    // config
    const enableSector1 = ref<boolean>(true)
    const enableSector2 = ref<boolean>(true)
    const enableSector3 = ref<boolean>(true)
    const enableSector4 = ref<boolean>(true)
    const enableSector5 = ref<boolean>(true)
    const enableSector6 = ref<boolean>(true)
    const enableSectorList = [
      enableSector1,
      enableSector2,
      enableSector3,
      enableSector4,
      enableSector5,
      enableSector6,
    ]
    const allowRepeat = ref<boolean>(false)

    // display
    const tiles = ref<(LasVegasTile | null)[][]>([])

    // user action
    const handleShuffle = () => {
      tiles.value = getTiles()
    }

    // helper
    const getTiles = (): (LasVegasTile | null)[][] => {
      const slotMatrix = new Array(roundNumber).fill(null).map(() => enableSectorList)
      const slotInUsedSize = slotMatrix
        .flatMap(slots => slots.flatMap(slot => slot.value))
        .filter(it => it).length

      const pollSize = Math.ceil(slotInUsedSize / lasVegasTiles.length) + 1 // +1 as buffer
      const usedPool: LasVegasTile[][] = new Array(pollSize).fill(null).map(() => [])
      const roundPool: LasVegasTile[][] = new Array(roundNumber).fill(null).map(() => [])

      let poolIndex = 0

      return slotMatrix.map((slots, roundIndex) => {
        return slots.map(slot => {
          // only perform flow if the sector is enabled
          if (slot.value === false) {
            return null
          }

          let validPool = constructValidPool(
            allowRepeat.value ? [] : usedPool[poolIndex],
            roundPool[roundIndex],
          )
          // check if it needs to shift usedPool
          if (validPool.length === 0) {
            poolIndex = poolIndex + 1
            validPool = constructValidPool(usedPool[poolIndex], roundPool[roundIndex])
          }

          // pick a tile
          const selectedTile = getRandomItemFromArray(validPool)

          // put into pools
          roundPool[roundIndex].push(selectedTile)
          usedPool[poolIndex].push(selectedTile)

          return selectedTile
        })
      })
    }

    const constructValidPool = (
      usedPool: LasVegasTile[],
      roundPool: LasVegasTile[],
    ): LasVegasTile[] => {
      const filteredByUserPool = without(lasVegasTiles, ...usedPool)
      const roundUsedTileSet = new Set(roundPool.map(tile => tile.tile))

      return filteredByUserPool.filter(tile => !roundUsedTileSet.has(tile.tile))
    }

    return {
      // display
      enableSectorList,
      allowRepeat,
      tiles,
      // action
      handleShuffle,
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
