import { IGrid, ISnakeGame } from "./types.js"

export class SnakeGame implements ISnakeGame {
  grid: IGrid
  score: number
  score2: string

  constructor(grid: IGrid) {
    this.grid = grid
    this.score = 0
    this.score2 = ""
  }
}
