<template>
  <div>
    <div class="flex items-center clickable" @click="handleClick">
      <SVGBase class="w-3 mr-2 fill-current" :svg-content="rightToggleIcon" v-if="!state" />
      <SVGBase class="w-3 mr-2 fill-current" :svg-content="downToggleIcon" v-else />
      <h2 class="text-1.13 leading-1.11 font-bold-set">{{ title }}</h2>
    </div>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div v-if="state">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
// eslint-disable-next-line import/no-named-as-default
import gsap from 'gsap'
import { downToggleIcon, rightToggleIcon } from '~/assets/icons'
import SVGBase from '~/components/SVGBase.vue'
import Callback = gsap.Callback

export default defineComponent({
  name: 'ToggleDisplay',

  components: { SVGBase },
  // layout: '',
  props: {
    defaultState: {
      type: Boolean,
      default: false,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
  },

  setup(props, { emit }) {
    const state = ref(props.defaultState)
    const handleClick = () => {
      state.value = !state.value
    }

    // transition
    const beforeEnter = (el: HTMLElement) => {
      el.style.opacity = '0'
      el.style.height = '0'
    }
    const enter = (el: HTMLElement, done: Callback) => {
      gsap.to(el, {
        height: 'auto',
        duration: 0.3,
        ease: 'Power2.easeOut',
        onComplete: done,
      })
    }
    const afterEnter = (el: HTMLElement) => {
      gsap.to(el, {
        opacity: 1,
        duration: 0.1,
      })
    }
    const beforeLeave = (el: HTMLElement) => {
      gsap.to(el, {
        opacity: 0,
        duration: 0.1,
      })
    }
    const leave = (el: HTMLElement, done: Callback) => {
      gsap.to(el, {
        height: '0',
        duration: 0.3,
        ease: 'Power2.easeOut',
        onComplete: done,
        delay: 0.1,
      })
    }

    return {
      rightToggleIcon,
      downToggleIcon,
      state,
      handleClick,
      // transition
      beforeEnter,
      enter,
      afterEnter,
      beforeLeave,
      leave,
    }
  },
})
</script>

<style scoped></style>
