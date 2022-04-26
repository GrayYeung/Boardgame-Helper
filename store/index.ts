import {
  defaultGameSettings,
  defaultSettingObj,
  GameType,
  RootState,
  SettingObj,
  UpdateGameSettingObj,
} from '~/store/types'
import {
  Example,
  GetWordleQuizWordDocument,
  GetWordleSuggestionsDocument,
  QueryWordleSuggestionsArgs,
  Role,
} from '~/gen/composition'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

// root store
type RootContext = ActionContext<RootState, RootState>

export const state = (): RootState => ({
  examples: [] as Example[],
  appVersion: process.env.APP_VERSION ?? '0.0.0',
  isMenuOpen: false,
  isDarkMode: null,
  errorMsg: null,
  settingObj: defaultSettingObj,
  gameSettings: defaultGameSettings,
})

export const getters: GetterTree<RootState, RootState> = {
  //
  getAllKeywords: (state: RootState): (string | null | undefined)[] => {
    return state.examples.flatMap((e: Example) => e.keywords)
  },
  getAllKeywordsByRole:
    (state: RootState) =>
    (role: Role): (string | null | undefined)[] => {
      return state.examples.flatMap((e: Example) => {
        return e.role === role ? e.keywords : []
      })
    },

  /*Game Settings*/
  getGameSetting: (state: RootState) => (key: GameType) => {
    return state.gameSettings[key]
  },
}

export const mutations: MutationTree<RootState> = {
  /*Error*/
  setErrorMsg: (state: RootState, payload: string | null) => {
    state.errorMsg = payload
  },

  /*Menu*/
  setMenuOpen: (state: RootState, payload: boolean) => {
    state.isMenuOpen = payload
  },

  /*Color Theme*/
  setColorTheme: (state: RootState, payload: string) => {
    state.isDarkMode = payload === 'dark'
  },

  /*Setting*/
  setSettingObj: (state: RootState, payload: SettingObj) => {
    state.settingObj = payload
  },

  /*Game Settings*/
  setGameSettings: (state: RootState, payload: UpdateGameSettingObj) => {
    state.gameSettings[payload.key] = payload.value
  },

  //
  setExamples: (state: RootState, payload: Example[]) => {
    state.examples = payload
  },
}

export const actions: ActionTree<RootState, RootState> = {
  /*Menu*/
  openMenu: (context: RootContext) => {
    context.commit('setMenuOpen', true)
  },
  closeMenu: (context: RootContext) => {
    context.commit('setMenuOpen', false)
  },

  /*Wordle*/
  async fetchWordleSuggestions(
    context: RootContext,
    payload: QueryWordleSuggestionsArgs,
  ): Promise<string[] | undefined> {
    const client = this.app.apolloProvider.defaultClient
    try {
      const response = await client.query({
        query: GetWordleSuggestionsDocument,
        variables: {
          ...payload,
        },
        fetchPolicy: 'no-cache',
      })
      return response.data.wordleSuggestions
    } catch (e) {
      console.error(e)
    }
  },

  async fetchWordleQuizWord(context: RootContext): Promise<string | undefined> {
    const client = this.app.apolloProvider.defaultClient
    try {
      const response = await client.query({
        query: GetWordleQuizWordDocument,
        variables: {},
        fetchPolicy: 'no-cache',
      })
      return response.data.wordleQuizWord
    } catch (e) {
      console.error(e)
    }
  },
}
