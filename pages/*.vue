<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'RedirectPage',

  components: {},
  // layout: '',
  props: {},

  setup(props, { emit }) {
    const router = useRouter()
    const redirectToIndex = () => router.push({ name: 'index' })
    redirectToIndex()

    return {}
  },
})
</script>

<style scoped></style>
