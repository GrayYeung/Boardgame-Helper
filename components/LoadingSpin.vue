<template>
  <div class="lds-ring flex items-center justify-center" :style="styleParent">
    <div class="" :style="styleChild"></div>
    <div class="" :style="styleChild"></div>
    <div class="" :style="styleChild"></div>
    <div class="" :style="styleChild"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { GREY_COLOR_100 } from '~/components/helper/color'

export default defineComponent({
  name: 'LoadingSpin',

  components: {},
  props: {
    color: {
      type: String,
      default: GREY_COLOR_100,
      required: false,
    },
    size: {
      type: Number,
      default: 2.5, // rem
      required: false,
    },
  },
  // layout: '',

  setup(props) {
    const { color, size } = props
    const sizeRem = `${size}rem`

    const styleParent = {
      width: sizeRem,
      height: sizeRem,
      fontSize: sizeRem,
    }

    const styleChild = {
      width: `0.8em`,
      height: `0.8em`,
      margin: `0.1em`,
      border: `0.1em solid ${color}`,
      borderColor: `${color} transparent transparent transparent`,
    }

    return {
      styleParent,
      styleChild,
    }
  },
})
</script>

<style scoped>
.lds-ring {
  display: inline-block;
  position: relative;
  /*width: 40px;*/
  /*height: 40px;*/
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  /*width: 32px;*/
  /*height: 32px;*/
  /*margin: 8px;*/
  /*border: 4px solid #c3c3c3;*/
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  /*border-color: #c3c3c3 transparent transparent transparent;*/
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
