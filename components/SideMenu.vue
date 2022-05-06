<template>
  <transition appear name="slide-fade">
    <div
      class="fixed md:static top-0 rounded-tr-4 rounded-br-4 md:rounded-none bg-beige-100 dark:bg-grey-600 shadow max-w-71 w-full h-full md:h-screen z-40 flex flex-col"
    >
      <div id="menu-item-container" class="mt-24 flex flex-col space-y-4">
        <button
          v-for="item in normalizedMenuList"
          :key="item.name"
          class="pl-10 h-9 w-full flex items-center text-1 leading-tight"
          :class="{ 'bg-beige-400 dark:bg-grey-300 text-gold': isSelected(item.name).value }"
          @click="handleClickItem(item.name)"
        >
          <SVGBase
            :svg-content="item.img"
            class="mr-6 w-[1em]"
            :class="isSelected(item.name).value ? 'fill-gold' : 'fill-current'"
          />
          <span :class="isSelected(item.name).value ? 'font-bold-set' : 'font-0spacing-set'">
            {{ item.title }}
          </span>
        </button>
      </div>

      <div class="pl-10 mt-auto mb-14 flex">
        <p class="text-1 leading-0.88 font-0spacing-set">v{{ appVersion }}</p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  unref,
  useRoute,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'
import { RootState } from '~/store/types'
import SVGBase from '~/components/SVGBase.vue'
import { MenuItem, menuList, pluginList } from '~/components/model/MenuItem'

export default defineComponent({
  name: 'SideMenu',

  components: { SVGBase },

  props: {},

  setup() {
    const store = useStore<RootState>()

    const appVersion = computed(() => store.state.appVersion)
    const storeSettingObj = computed(() => store.state.settingObj)

    // close
    const handleCloseMenu = () => {
      store.dispatch('closeMenu')
    }

    // menu items
    const route = useRoute()
    const isSelected = (name: string) => {
      const currentPath = route.value.name
      const convertTitle = `${name.toLocaleLowerCase()}`
      return computed(() => currentPath === convertTitle)
    }
    const router = useRouter()
    const normalizedPluginList = computed(() =>
      pluginList.flatMap((plugin: MenuItem) => {
        const isActive =
          unref(storeSettingObj)?.plugins.find(pluginSetting => pluginSetting.name === plugin.name)
            ?.isActive ?? true
        return isActive ? plugin : []
      }),
    )
    const normalizedMenuList = computed(() => [...menuList, ...unref(normalizedPluginList)])
    const handleClickItem = (name: string) => {
      if (!isSelected(name).value) {
        router.push({ name })
      }
      handleCloseMenu()
    }

    return {
      appVersion,
      handleCloseMenu,
      normalizedMenuList,
      isSelected,
      handleClickItem,
    }
  },
})
</script>

<style scoped>
.shadow {
  box-shadow: 0.13rem 0 0.25rem 0 rgba(0, 0, 0, 0.5);
}

.slide-fade-enter {
  opacity: 0.8;
  transform: translateX(-60%);
}

.slide-fade-enter-to {
  opacity: 1;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
</style>
