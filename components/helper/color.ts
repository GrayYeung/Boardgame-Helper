export const WHITE_COLOR = '#ffffff'
export const BLACK_COLOR = '#000000'
export const GREY_COLOR_100 = '#c3c3c3'
export const GREY_COLOR_800 = '#171717'
export const BEIGE_COLOR_200 = '#e6dfd0'

export const getRandomRGB = (): string => {
  const randomBetween = (min: number, max: number) =>
    min + Math.floor(Math.random() * (max - min + 1))
  const r = randomBetween(0, 255)
  const g = randomBetween(0, 255)
  const b = randomBetween(0, 255)
  return `rgb(${r},${g},${b})` // Collect all to a css color string
}

export const getRandomColors = (size: number): string[] => {
  const colors: string[] = []
  for (let i = 0; i < size; i++) {
    const color = getRandomRGB()
    colors.push(color)
  }
  return colors
}

export const getRandomRGBV2 = (): string => {
  const color = 'hsl(' + Math.random() * 360 + ', 100%, 75%)'
  return color
}
