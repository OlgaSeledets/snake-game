import { direction, IBlock, IFood, IGrid, ISnake, ISnakeGame } from "./types.js"

const opposite: Record<direction, direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
}

export class SnakeGame implements ISnakeGame {
  grid: IGrid
  food: IFood
  block: IBlock
  snake: ISnake
  score: number
  score2: string
  gameOver: boolean

  private timerId?: number
  private direction: direction = "right"
  private onTick?: () => void
  speed: number

  constructor(grid: IGrid, food: IFood, block: IBlock, snake: ISnake) {
    this.grid = grid
    this.food = food
    this.block = block
    this.snake = snake
    this.score = 0
    this.score2 = ""
    this.speed = 200
    this.gameOver = false
  }

  setDirection(next: direction) {
    if (opposite[this.direction] === next) return
    this.direction = next
  }

  startHeartbeat(onTick?: () => void) {
    this.onTick = onTick
    this.stopHeartbeat()

    this.timerId = window.setInterval(() => {
      const head = this.snake.getParts()[0]
      const ate = head.posXcl === this.food.posXcl && head.posYcl === this.food.posYcl

      this.snake.changePartsPosition(
        this.grid.sizeYcl,
        this.grid.sizeXcl,
        this.direction
      )

      if (ate) {
        this.snake.setPartsViaEatting()
        this.food.generationFoodPosition(this.grid.sizeYcl, this.grid.sizeXcl)
        this.score += 1
        this.score2 = String(this.score)

        localStorage.setItem("score", this.score2)

        if (this.snake.getLength() % 5 === 0) {
          this.speed = Math.max(10, this.speed - 10)
          this.startHeartbeat(this.onTick)
          return
        }
      }

      if (this.snake.collisionWithBody()) {
        this.stopHeartbeat()
        this.gameOver = true
        const theBestScore = localStorage.getItem("theBestScore")
        if (theBestScore === null || Number(theBestScore) <= this.score) {
          localStorage.setItem("theBestScore", this.score2)
        }
        else {
          localStorage.setItem("theBestScore", theBestScore)
        }
      }

      if (this.snake.collisionWithBlock({ posXcl: this.block.posXcl, posYcl: this.block.posYcl })) {
        this.stopHeartbeat()
        this.gameOver = true
        const theBestScore = localStorage.getItem("theBestScore")
        if (theBestScore === null || Number(theBestScore) <= this.score) {
          localStorage.setItem("theBestScore", this.score2)
        }
        else {
          localStorage.setItem("theBestScore", theBestScore)
        }
      }

      this.onTick?.()
    }, this.speed)
  }

  stopHeartbeat() {
    if (this.timerId !== undefined) {
      clearInterval(this.timerId)
      this.timerId = undefined
    }
  }
}
