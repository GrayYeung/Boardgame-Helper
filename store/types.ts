import { Example } from '~/gen/composition'
import { MenuItem, pluginList } from '~/components/helper/MenuItem'

export interface RootState {
  examples: Example[]
  appVersion: string
  isMenuOpen: boolean
  isDarkMode: boolean | null
  errorMsg: string | null
  settingObj: SettingObj
}

export interface SettingObj {
  [key: string]: any //FIXME: dont use any.
  plugins: Plugin[]
}

export type Plugin = {
  name: string
  title: string
  isActive: boolean
}

export const defaultSettingObj: SettingObj = {
  plugins: pluginList.map((plugin: MenuItem) => {
    return { name: plugin.name, title: plugin.title, isActive: true }
  }),
}

export interface AnotherState {
  [x: string]: any

  anything: string
}
