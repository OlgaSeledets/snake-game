import { Food } from "./Food.js"

export interface ISnakeGame {
  readonly grid: IGrid
  // readonly snake: ISnake
  readonly food: IFood
  readonly block: IBlock
  snake: ISnake
  readonly score: number
}

export interface IGrid {
  sizeXcl: number
  sizeYcl: number
  cellSizePx: number
  getCells(): Generator<{ posXcl: number, posYcl: number }>
}

export interface IBlock {
  type: string
  posXcl: number
  posYcl: number
}

export interface ISnake {
  getLength(): number
  getParts(): Array<ISnakePart>
  setPartsViaEatting(prevParts: Array<ISnakePart>, food: { posXcl: number; posYcl: number }): Array<ISnakePart>
  changePartsPosition(prevParts: Array<ISnakePart>, gridSizeYcl: number, gridSizeXcl: number, direction: string): Array<ISnakePart>
  collisionWithBody(): void
  collisionWithBlock(blockPosition: { posXcl: number; posYcl: number }): void
  heartbeat(
    foodPosition: { posXcl: number; posYcl: number },
    gridSizeYcl: number,
    gridSizeXcl: number,
    direction: string,
    blockPosition: { posXcl: number; posYcl: number },
    onTick?: () => void
  ): void
  stopHeartbeat(): void
}

export interface ISnakePart {
  posXcl: number
  posYcl: number
  type: "head" | "body" | "tail"
}

export interface IFood {
  type: string
  posXcl: number
  posYcl: number
  generationFoodPosition(gridSizeYcl: number, gridSizeXcl: number): void
}
