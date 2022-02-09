export const checkPasscodeFormat = (passcode: string): boolean => {
  const format = /^[\w!@#$%^&*\-_+=<>:;"'?,.`~/\\]+$/
  return format.test(passcode)
}

export const getOrdinalSuffixOf = (i: number): string => {
  const j = i % 10
  const k = i % 100
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
}
