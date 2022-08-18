export class LasVegasTile {
  tile: string
  side: number
  name: string

  constructor(tile: string, side: number, name: string) {
    this.tile = tile
    this.side = side
    this.name = name
  }
}

const tileA1 = new LasVegasTile('A', 1, '幸運一擊')
const tileA2 = new LasVegasTile('A', 2, '幸運彩池')
const tileB1 = new LasVegasTile('B', 1, '黃金時段')
const tileB2 = new LasVegasTile('B', 2, '五十五十')
const tileC1 = new LasVegasTile('C', 1, '擊掌慶祝')
const tileC2 = new LasVegasTile('C', 2, '霉運')
const tileD1 = new LasVegasTile('D', 1, '連本帶利')
const tileD2 = new LasVegasTile('D', 2, '數量優勢')
const tileE1 = new LasVegasTile('E', 1, '此路不通！')
const tileE2 = new LasVegasTile('E', 2, '酩酊大醉')
const tileF1 = new LasVegasTile('F', 1, '攔截！')
const tileF2 = new LasVegasTile('F', 2, '讓賽')
const tileG1 = new LasVegasTile('G', 1, '黑盒')
const tileG2 = new LasVegasTile('G', 2, '雙倍下注')
const tileH1 = new LasVegasTile('H', 1, '鴻運當頭')
const tileH2 = new LasVegasTile('H', 2, '任君選擇')

export const lasVegasTiles = [
  tileA1,
  tileA2,
  tileB1,
  tileB2,
  tileC1,
  tileC2,
  tileD1,
  tileD2,
  tileE1,
  tileE2,
  tileF1,
  tileF2,
  tileG1,
  tileG2,
  tileH1,
  tileH2,
]
