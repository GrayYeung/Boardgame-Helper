<template>
  <div class="switch clickable">
    <input type="checkbox" :value="value" aria-label="checkbox" />
    <div
      id="switch-container"
      class="flex items-center"
      :class="value ? 'container-on' : 'container-off'"
      @click="$emit('click', !value)"
    >
      <span
        id="circle"
        class="flex items-center justify-center"
        :class="value ? 'circle-on' : 'circle-off'"
      >
        <span v-if="value" class="text-white text-0.63 leading-normal font-normal" />
        <span v-else class="text-primary-color text-0.63 leading-normal font-normal" />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BooleanSwitch',

  components: {},
  // layout: '',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  setup(props, { emit }) {
    return {}
  },
})
</script>

<style scoped>
:root {
  --switch-width: 2.5rem;
  --circle-width: 1.5rem;
}

.switch > input {
  @apply hidden;
}

#switch-container {
  --switch-width: 2.5rem;
  transition: background-color 0.3s linear 0s;
  @apply w-[var(--switch-width)] h-6 border-solid border-0.25 border-silver rounded-3xl box-border;
}
.container-on {
  @apply bg-gold;
}
.container-off {
  @apply bg-grey-600;
}

#circle {
  --circle-width: 1.5rem;
  transition: transform 0.3s linear 0s;
  @apply w-[var(--circle-width)] h-6 px-2 py-0 border-solid border-0.25 border-silver rounded-full box-border;
}
.circle-on {
  @apply bg-gold-pair;
}
.circle-off {
  @apply bg-grey-600;
}

/*transition*/
.container-on > #circle {
  transform: translateX(calc(var(--switch-width) - var(--circle-width)));
}
.container-off > #circle {
  transform: translateX(-0.0625rem);
}
</style>
