<template>
  <div class="text-divider text-0.75-normal" v-if="title">{{ title }}</div>
  <div class="semi-divider" v-else></div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SemiDivider',

  components: {},
  // layout: '',
  props: {
    title: {
      type: String,
      default: undefined,
      required: false,
    },
  },

  setup(props, { emit }) {
    return {}
  },
})
</script>

<style scoped>
.text-divider {
  display: flex;
  align-items: center;
  --text-divider-gap: 0.5rem; /*set a customizable gap between label and lines*/
}

.text-divider::before,
.text-divider::after {
  content: '';
  height: 0.03125rem;
  background-color: #979797;
  flex-grow: 1;
}

.text-divider::before {
  margin-right: var(--text-divider-gap);
}

.text-divider::after {
  margin-left: var(--text-divider-gap);
}
</style>
