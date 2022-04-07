<template>
  <div />
</template>

<script lang="ts">
import { computed, defineComponent, unref, useRouter, useStore } from '@nuxtjs/composition-api'
import { RootState } from '~/store/types'

export default defineComponent({
  name: 'Index',

  // components: {},
  // layout: '',
  // props: {},

  setup(props, { emit }) {
    const router = useRouter()
    const store = useStore<RootState>()

    if (process.client) {
      // FIXME: workaround
      setTimeout(() => {
        // check settingObj
        const homePage = computed(() => store.state.settingObj.homePage)
        const plugins = computed(() => store.state.settingObj.plugins)
        const pushPage = unref(plugins).find(
          plugin => plugin.name === homePage.value && plugin.isActive,
        )
        const redirectToHome = () => router.push({ name: pushPage?.name ?? 'index-setting' })
        redirectToHome()
      }, 100)
    }

    return {}
  },
})
</script>

<style scoped></style>
