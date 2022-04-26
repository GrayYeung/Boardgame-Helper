export class QuestGamePlayOption {
  name: string // as id
  playerNumber: number
  missionNumbers: number[]
  doubleFailRounds: number[]
  enableWaterRounds: number[]

  constructor(
    name: string,
    playerNumber: number,
    missionNumbers: number[],
    doubleFailRounds: number[],
    enableWaterRounds: number[],
  ) {
    this.name = name
    this.playerNumber = playerNumber
    this.missionNumbers = missionNumbers
    this.doubleFailRounds = doubleFailRounds
    this.enableWaterRounds = enableWaterRounds
  }
}

const QuestGamePlayOption4A = new QuestGamePlayOption('4A', 4, [2, 3, 2, 3], [], [])
const QuestGamePlayOption4B = new QuestGamePlayOption('4B', 4, [2, 3, 3, 2], [], [])
const QuestGamePlayOption5 = new QuestGamePlayOption('5', 5, [2, 3, 2, 4, 3], [], [])
const QuestGamePlayOption6 = new QuestGamePlayOption('6', 6, [2, 3, 4, 3, 4], [], [2])
const QuestGamePlayOption7 = new QuestGamePlayOption('7', 7, [2, 3, 3, 4, 4], [], [2, 3])
const QuestGamePlayOption8 = new QuestGamePlayOption('8', 8, [3, 4, 4, 5, 5], [4], [2, 3, 4])
const QuestGamePlayOption9 = new QuestGamePlayOption('9', 9, [3, 4, 4, 5, 5], [4], [2, 3, 4])
const QuestGamePlayOption10 = new QuestGamePlayOption('10', 10, [3, 4, 4, 5, 5], [4], [2, 3, 4])
const QuestGamePlayOption5Director = new QuestGamePlayOption(
  '5-Director',
  5,
  [3, 2, 3, 4, 3],
  [4],
  [],
)
const QuestGamePlayOption6Director = new QuestGamePlayOption(
  '6-Director',
  6,
  [3, 2, 3, 4, 3],
  [4],
  [4],
)
const QuestGamePlayOption7Director = new QuestGamePlayOption(
  '7-Director',
  7,
  [3, 2, 3, 4, 3],
  [4],
  [3, 4],
)
const QuestGamePlayOption8Director = new QuestGamePlayOption(
  '8-Director',
  8,
  [4, 3, 4, 5, 4],
  [3, 4],
  [2, 3, 4],
)
const QuestGamePlayOption9Director = new QuestGamePlayOption(
  '9-Director',
  9,
  [4, 3, 4, 5, 4],
  [3, 4],
  [2, 3, 4],
)
const QuestGamePlayOption10Director = new QuestGamePlayOption(
  '10-Director',
  10,
  [4, 3, 4, 5, 4],
  [3, 4],
  [2, 3, 4],
)

const questGamePlayOptionsList = [
  QuestGamePlayOption4A,
  QuestGamePlayOption4B,
  QuestGamePlayOption5,
  QuestGamePlayOption6,
  QuestGamePlayOption7,
  QuestGamePlayOption8,
  QuestGamePlayOption9,
  QuestGamePlayOption10,
  QuestGamePlayOption5Director,
  QuestGamePlayOption6Director,
  QuestGamePlayOption7Director,
  QuestGamePlayOption8Director,
  QuestGamePlayOption9Director,
  QuestGamePlayOption10Director,
]

export const questGamePlayOptions = new Map(
  questGamePlayOptionsList.map(option => [option.name, option]),
)
