const breakpoints = {
  sm: 0,
  md: 768,
  lg: 1200,
  xl: 1920,
}

export const getBreakpoint = (width: number): string => {
  for (const [screen, value] of Object.entries(breakpoints).reverse()) {
    if (width >= value) {
      return screen
    }
  }
  return Object.keys(breakpoints)[0] // unreachable
}
