<template>
  <button class="">
    <SVGBase :svg-content="menuBtn" class="w-5 fill-current" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { menuBtn } from '~/assets/buttons'
import SVGBase from '~/components/SVGBase.vue'

export default defineComponent({
  name: 'MenuButton',

  components: { SVGBase },

  props: {},

  setup() {
    return { menuBtn }
  },
})
</script>

<style scoped></style>
