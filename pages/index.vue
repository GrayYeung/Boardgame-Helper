<template>
  <div class="md:flex">
    <SideMenu class="hidden md:flex flex-none w-71" />
    <nuxt-child class="md:w-[calc(100%-17.75rem)] flex-auto" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SideMenu from '~/components/SideMenu.vue'

export default defineComponent({
  name: 'IndexRoot',

  components: {
    SideMenu,
  },
  // layout: '',
  // props: {},

  setup(props, { emit }) {
    return {}
  },
})
</script>

<style scoped></style>
