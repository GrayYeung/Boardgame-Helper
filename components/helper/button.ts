import { Ref } from '@nuxtjs/composition-api'

export interface Button {
  title: string
  onClick: Function
  icon?: string
  css?: string
  showLoading?: Ref<boolean>
  isDisable?: Ref<boolean>
}
