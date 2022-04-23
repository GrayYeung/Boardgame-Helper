import { Example } from '~/gen/composition'
import { MenuItem, pluginList } from '~/components/model/MenuItem'

export interface RootState {
  examples: Example[]
  appVersion: string
  isMenuOpen: boolean
  isDarkMode: boolean | null
  errorMsg: string | null
  settingObj: SettingObj
  gameSettings: GameSetting
}

export interface SettingObj {
  [key: string]: any //FIXME: dont use any.
  homePage: string
  plugins: Plugin[]
}

export type Plugin = {
  name: string
  title: string
  isActive: boolean
}

export const defaultSettingObj: SettingObj = {
  homePage: 'index-setting',
  plugins: pluginList.map((plugin: MenuItem) => {
    return { name: plugin.name, title: plugin.title, isActive: true }
  }),
}

export interface AnotherState {
  [x: string]: any

  anything: string
}

export type GameType = 'quest'

export interface GameSetting {
  quest: any
}

export const defaultGameSettings: GameSetting = {
  quest: null,
}

export interface UpdateGameSettingObj {
  key: GameType
  value: any
}
