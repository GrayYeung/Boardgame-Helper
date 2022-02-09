<template>
  <div>
    <!-- eslint-disable vue/no-v-html -->
    <div id="svgContainer" v-html="svgContent" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SVGBase',

  components: {},
  // layout: '',
  props: {
    svgContent: {
      type: String,
      default: '',
      required: false,
    },
  },

  setup(props, { emit }) {
    return {}
  },
})
</script>

<style scoped></style>
