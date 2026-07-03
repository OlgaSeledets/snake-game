import { IBlock, IFood, IGrid, ISnake, ISnakeGame } from "./types.js"

export class SnakeGame implements ISnakeGame {
  grid: IGrid
  food: IFood
  block: IBlock
  snake: ISnake
  score: number
  score2: string

  constructor(grid: IGrid, food: IFood, block: IBlock, snake: ISnake) {
    this.grid = grid
    this.food = food
    this.block = block
    this.snake = snake
    this.score = 0
    this.score2 = ""
  }
}
