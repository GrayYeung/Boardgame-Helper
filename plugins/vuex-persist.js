// eslint-disable-next-line import/no-named-as-default
import VuexPersistence from 'vuex-persist'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      /* your options */
      key: 'bg-helper-vuex',
      storage: window.localStorage, // window.sessionStorage,
      reducer: state => ({
        examples: state.examples,
        settingObj: state.settingObj,
        gameSettings: state.gameSettings,
      }),
    }).plugin(store)
  })
}
