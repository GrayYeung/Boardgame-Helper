import { InvalidPasscode } from '~/server-middleware/backend/errors/general-error'

const errorMapping: Map<string, string> = new Map([[InvalidPasscode.message, '錯誤']])

export const errorParser = (errorMsg: string): string => {
  if (errorMsg.includes(InvalidPasscode.message)) return '輸入錯誤'

  return errorMapping.get(errorMsg) ?? errorMsg
}
