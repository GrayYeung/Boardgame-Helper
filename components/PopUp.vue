<template>
  <div
    class="top-0 fixed w-inherit h-full bg-[rgba(23,23,23,0.25)] flex items-center justify-center"
    @click.self="handleDismiss"
  >
    <div class="bg-white dark:bg-grey-600 rounded-5 mx-10 flex flex-col">
      <p class="font-bold-set text-1 leading-tight text-center my-6 px-14">
        {{ title }}
      </p>
      <slot></slot>
      <div class="flex items-center justify-center my-6 px-5">
        <SecondButton
          v-if="secondButton"
          class="mr-4"
          :class="secondButton.css"
          :title="secondButton.title"
          :icon="secondButton.icon"
          :show-loading="showLoading(secondButton.showLoading)"
          :is-disable="isDisable(secondButton.isDisable)"
          :handle-click="secondButton.onClick"
        />
        <FirstButton
          class=""
          :title="firstButton.title"
          :class="firstButton.css"
          :icon="firstButton.icon"
          :show-loading="showLoading(firstButton.showLoading)"
          :is-disable="isDisable(firstButton.isDisable)"
          :handle-click="firstButton.onClick"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, PropType, Ref } from '@nuxtjs/composition-api'
import TextButton from '~/components/buttons/TextButton.vue'
import { Button } from '~/components/helper/button'

export default defineComponent({
  name: 'PopUp',

  components: {
    FirstButton: TextButton,
    SecondButton: TextButton,
  },

  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
    firstButton: {
      type: Object as PropType<Button>,
      required: true,
    },
    secondButton: {
      type: Object as PropType<Button>,
      required: false,
      default: () => undefined,
    },
  },

  setup(props, { emit }) {
    // dismiss menu
    const handleDismiss = () => {
      emit('close')
    }

    const showLoading = (ref: Ref<boolean> | undefined): boolean | undefined => {
      return ref?.value
    }

    const isDisable = (ref: Ref<boolean> | undefined): boolean => {
      return ref?.value ?? false
    }

    onMounted(() => {
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.touchAction = 'none'
    })
    onUnmounted(() => {
      document.documentElement.style.overflow = 'auto'
      document.documentElement.style.touchAction = 'auto'
    })

    return {
      showLoading,
      handleDismiss,
      isDisable,
    }
  },
})
</script>

<style scoped></style>
