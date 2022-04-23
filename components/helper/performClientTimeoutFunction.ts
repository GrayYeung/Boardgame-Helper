export const performClientTimeoutFunction = (inputFunction: Function): void => {
  if (process.client) {
    setTimeout(() => {
      inputFunction()
    }, 100)
  }
}
