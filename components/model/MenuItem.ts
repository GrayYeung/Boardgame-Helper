import { packageIcon, settingIcon } from '~/assets/icons'

export interface MenuItem {
  title: string
  name: string
  img: string
  type: 'main' | 'plugin'
}

export const menuList: MenuItem[] = [
  {
    title: '設定',
    name: 'index-setting',
    img: settingIcon,
    type: 'main',
  },
]

export const pluginList: MenuItem[] = [
  {
    title: 'Wordle',
    name: 'index-wordle',
    img: packageIcon,
    type: 'plugin',
  },
]
