<template>
  <div
    class="top-0 fixed bg-[rgba(23,23,23,0.25)] w-full h-full z-35"
    @click.self="handleCloseMenu"
  >
    <SideMenu />
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import { RootState } from '~/store/types'
import SideMenu from '~/components/SideMenu.vue'

export default defineComponent({
  name: 'SideMenuWrapper',

  components: { SideMenu },

  props: {},

  setup() {
    const store = useStore<RootState>()

    // close
    const handleCloseMenu = () => {
      store.dispatch('closeMenu')
    }

    return {
      handleCloseMenu,
    }
  },
})
</script>

<style scoped></style>
