<template>
  <button
    class="p-2 rounded-md flex items-center text-1 leading-none font-normal-set transition-all-0-linear-0 border-solid border-[0.15rem] border-grey-800 dark:border-white min-w-24 text-grey-800 dark:text-white bg-transparent no-outline ta:active:shadow-0_25-grey-800 ta:active:dark:shadow-0_25-white"
    :class="{ 'pointer-events-none opacity-50': isDisable }"
    @click="handleClick"
  >
    <span class="flex-1 min-w-3.25">
      <SVGBase :svg-content="icon" v-if="!!icon" class="w-3.25 fill-grey-800 dark:fill-white" />
    </span>
    <span class="flex-initial text-center mx-1">{{ title }}</span>
    <span class="flex-1 flex min-w-3.25">
      <LoadingSpin
        v-if="isLoading"
        class=""
        :size="1"
        :color="isDarkMode ? 'white' : 'var(--grey-color-800)'"
      />
    </span>
  </button>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  useStore,
} from '@nuxtjs/composition-api'
import SVGBase from '~/components/SVGBase.vue'
import LoadingSpin from '~/components/LoadingSpin.vue'
import { RootState } from '~/store/types'

export default defineComponent({
  name: 'TextButton',

  components: { SVGBase, LoadingSpin },
  // layout: '',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
      required: false,
    },
    handleClick: {
      type: Function,
      default: () => {},
      required: false,
    },
    showLoading: {
      type: Boolean,
      default: undefined,
      required: false,
    },
    isDisable: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  setup(props, { emit }) {
    const store = useStore<RootState>()
    const { showLoading } = toRefs(props)
    const isDarkMode = reactive(computed(() => store.state.isDarkMode))

    onMounted(() => {
      const button = document.querySelector('button')!
      button.addEventListener('dblclick', el => el.preventDefault())
    })

    return {
      isLoading: showLoading,
      isDarkMode,
    }
  },
})
</script>

<style scoped></style>
