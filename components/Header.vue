<template>
  <header
    class="fixed w-inherit h-20 top-0 z-10 flex flex-col border-solid border-b-0.25 border-silver bg-beige-200 dark:bg-black"
    :title="title"
  >
    <div class="flex-initial flex items-center justify-between pt-8">
      <div class="flex-1 flex items-center justify-center">
        <MenuButton
          class="mr-auto ml-5 md:hidden"
          @click.native="handleOpenMenu"
          v-if="isSmScreen"
        />
      </div>
      <div class="flex-1 flex items-center justify-center">
        <h1 class="text-center font-bold-set text-1.25 leading-none">
          {{ title }}
        </h1>
      </div>
      <div class="flex-1 flex justify-end"></div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, unref, useStore } from '@nuxtjs/composition-api'
import { useWindowSize } from 'vue-window-size'
import MenuButton from '~/components/buttons/MenuButton.vue'
import { RootState } from '~/store/types'
import { getBreakpoint } from '~/components/helper/breakpoints'

export default defineComponent({
  name: 'Header',

  components: {
    MenuButton,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
  },

  setup() {
    const store = useStore<RootState>()

    // menu
    const handleOpenMenu = () => {
      store.dispatch('openMenu')
    }

    // window size
    const { width, height } = useWindowSize()
    const isSmScreen = computed(() => getBreakpoint(unref(width)) === 'sm')

    return {
      handleOpenMenu,
      isSmScreen,
    }
  },
})
</script>

<style scoped></style>
