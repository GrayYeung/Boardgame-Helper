<template>
  <label class="">
    <slot />
  </label>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DropDownWrap',

  components: {},
  // layout: '',
  props: {},

  setup(props, { emit }) {
    return {}
  },
})
</script>

<style scoped>
label::after {
  content: '\25BC'; /* black down-pointing triangle */
  font-size: 0.8rem;
  display: inline-block;
  color: var(--gold-color);
  background-color: transparent;
  vertical-align: 5%;
  margin-left: 0.1rem; /* remove the damn :after space */
  pointer-events: none; /* let the click pass trough */
}
</style>
