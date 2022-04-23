<template>
  <div class="child-page-container flex flex-col">
    <Header class="flex-initial" title="設定" />

    <main class="flex-auto mt-20 pb-20 px-4">
      <client-only>
        <section class="mt-4">
          <div class="flex items-center justify-between">
            <h2 class="text-1 leading-none">顏色模式</h2>
            <DropDownWrap>
              <select
                v-model="$colorMode.preference"
                class="text-gold text-1 leading-none clickable no-outline bg-transparent"
                @change="handleChange($event)"
              >
                <!--              <option value="system">系統</option>-->
                <option value="light">淺色</option>
                <option value="dark">深色</option>
              </select>
            </DropDownWrap>
          </div>
        </section>

        <SemiDivider class="my-4" />

        <section class="mt-4">
          <div class="flex items-center justify-between">
            <h2 class="text-1 leading-none">首頁</h2>
            <DropDownWrap>
              <select
                style="direction: rtl"
                v-model="homePageRef"
                class="text-gold text-1 leading-none clickable no-outline bg-transparent"
                @change="handleUpdateHomePage($event)"
              >
                <option
                  v-for="plugin in settingObj.plugins"
                  :key="plugin.name"
                  :value="plugin.name"
                >
                  {{ plugin.title }}
                </option>
                <option v-for="menu in menuList" :key="menu.name" :value="menu.name">
                  {{ menu.title }}
                </option>
              </select>
            </DropDownWrap>
          </div>
        </section>

        <SemiDivider class="my-4" />

        <section>
          <h2 class="text-1 leading-none mb-2">插件開關</h2>
          <div
            v-for="plugin in settingObj.plugins"
            :key="plugin.name"
            class="flex items-center justify-between"
          >
            <h3 class="text-1 leading-none">{{ plugin.title }}</h3>
            <BooleanSwitch
              :value="plugin.isActive"
              @click="handleUpdatePlugin($event, plugin.name)"
            />
          </div>
        </section>
      </client-only>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, useStore } from '@nuxtjs/composition-api'
import { Plugin, RootState, SettingObj } from '~/store/types'
import BooleanSwitch from '~/components/input/BooleanSwitch.vue'
import DropDownWrap from '~/components/input/DropDownWrap.vue'
import Header from '~/components/Header.vue'
import SVGBase from '~/components/SVGBase.vue'
import { menuList } from '~/components/model/MenuItem'

export default defineComponent({
  name: 'Setting',

  components: { BooleanSwitch, DropDownWrap, Header, SVGBase },
  // layout: '',
  props: {},

  setup(props, { emit }) {
    const store = useStore<RootState>()

    // display
    const storeSettingObj = computed(() => store.state.settingObj)
    const settingObj = reactive(storeSettingObj)
    const homePageRef = computed(() => store.state.settingObj.homePage)

    // update setting
    const getUpdatedObj = (key: string, val: any): SettingObj => {
      const newObj = { ...storeSettingObj.value }
      newObj[key] = val
      return newObj
    }
    const getUpdatedObjWithUpdateArray = (key: string, mapFn: Function): SettingObj => {
      const newObj = { ...storeSettingObj.value }
      newObj[key] = newObj[key].map(mapFn)
      return newObj
    }
    const handleUpdateSwitch = (e: boolean, key: string) => {
      const newObj = getUpdatedObj(key, e)
      store.commit('setSettingObj', newObj)
    }

    // homePage
    const handleUpdateHomePage = (e: Event) => {
      const target = e.target as HTMLSelectElement
      const newObj = getUpdatedObj('homePage', target.value)
      store.commit('setSettingObj', newObj)
    }

    // plugin
    const handleUpdatePlugin = (e: boolean, name: string) => {
      const mapFun = (item: Plugin) => {
        return item.name === name ? { ...item, isActive: e } : item
      }
      const newObj = getUpdatedObjWithUpdateArray('plugins', mapFun)
      store.commit('setSettingObj', newObj)
    }

    // color theme
    const handleChange = (e: Event) => {
      const target = e.target as HTMLSelectElement
      const newTheme = target.value
      store.commit('setColorTheme', newTheme)
    }

    return {
      settingObj,
      menuList,
      handleUpdateSwitch,
      // color theme
      handleChange,
      // homePage
      homePageRef,
      handleUpdateHomePage,
      // plugin
      handleUpdatePlugin,
    }
  },
})
</script>

<style scoped></style>
