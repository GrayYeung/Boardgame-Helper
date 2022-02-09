<template>
  <div class="page-container bg-white dark:bg-black text-grey-800 dark:text-white">
    <transition appear name="fade-out">
      <SideMenuWrapper v-if="isMenuOpen" />
    </transition>

    <Nuxt />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  unref,
  useMeta,
  useRoute,
  useStore,
  watch,
} from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'
import { RootState } from '~/store/types'
import SideMenuWrapper from '~/components/SideMenuWrapper.vue'
import { BEIGE_COLOR_200, BLACK_COLOR, WHITE_COLOR } from '~/components/helper/color'
import { upsert } from '~/components/helper/array'

export default defineComponent({
  components: {
    SideMenuWrapper,
  },
  setup(props, { emit }) {
    const store = useStore<RootState>()

    // color theme
    onMounted(() => {
      const colorTheme = localStorage.getItem('nuxt-color-mode')
      store.commit('setColorTheme', colorTheme)
    })
    const { meta } = useMeta()
    const setThemeColor = () => {
      const themeColorTag = {
        hid: 'theme-color',
        name: 'theme-color',
        content: unref(isDarkMode) ? BLACK_COLOR : BEIGE_COLOR_200,
      }
      meta.value = upsert(
        cloneDeep(meta.value),
        themeColorTag,
        (_element, index, arr) => _element.hid === 'theme-color',
      )
    }

    // background color
    const isDarkMode = computed(() => store.state.isDarkMode)
    const setBackgroundColor = () => {
      const body = document.querySelector('body')!
      body.style.backgroundColor = unref(isDarkMode) ? BLACK_COLOR : WHITE_COLOR
      setThemeColor()
    }
    onMounted(setBackgroundColor)
    watch(isDarkMode, setBackgroundColor)

    // display
    const route = useRoute()
    const convertedTitle = (path: string) =>
      path.length === 0 || path === '/' ? undefined : path.substring(1)
    const title = computed(() => convertedTitle(route.value.path))
    useMeta(() => ({ title: title.value }))

    // menu
    const isMenuOpen = computed(() => store.state.isMenuOpen)
    watch(isMenuOpen, () => {
      // disable background scroll
      if (isMenuOpen.value) {
        document.documentElement.style.overflow = 'hidden'
        document.documentElement.style.touchAction = 'none'
      } else {
        document.documentElement.style.overflow = 'auto'
        document.documentElement.style.touchAction = 'auto'
      }
    })

    // handle touch device
    onMounted(() => document.addEventListener('touchstart', function () {}, false))

    return { isMenuOpen }
  },
  head: {},
})
</script>

<style>
.fade-out-leave {
  opacity: 1;
}

.fade-out-leave-to {
  opacity: 0;
}

.fade-out-leave-active {
  transition: all 0.2s ease-out;
}
</style>
