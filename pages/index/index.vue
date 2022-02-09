<template>
  <div />
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Index',

  // components: {},
  // layout: '',
  // props: {},

  setup(props, { emit }) {
    const router = useRouter()
    const redirectToHome = () => router.push({ name: 'index-setting' })
    redirectToHome()

    return {}
  },
})
</script>

<style scoped></style>
