export interface ISnakeGame {
  readonly grid: IGrid
  // readonly snake: ISnake
  readonly food: IFood
  readonly block: IBlock
  snake: ISnake
  readonly score: number
  readonly score2: string
  readonly speed: number
  gameOver: boolean
  startHeartbeat(onTick?: () => void): void
  setDirection(next: direction): void
  stopHeartbeat(): void
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
  generationBlockPosition(gridSizeYcl: number, gridSizeXcl: number): void
}

export type direction = "right" | "left" | "up" | "down"

export interface ISnake {
  startXcl: number
  startYcl: number
  generationSnakePosition(gridSizeYcl: number, gridSizeXcl: number): void
  getLength(): number
  getParts(): Array<ISnakePart>
  // setPartsViaEatting(prevParts: Array<ISnakePart>, food: { posXcl: number; posYcl: number }): Array<ISnakePart>
  setPartsViaEatting(): void
  // changePartsPosition(prevParts: Array<ISnakePart>, gridSizeYcl: number, gridSizeXcl: number, direction: string): Array<ISnakePart>
  changePartsPosition(gridSizeYcl: number, gridSizeXcl: number, direction: direction): void
  collisionWithBody(): boolean
  collisionWithBlock(blockPosition: { posXcl: number; posYcl: number }): boolean
  // heartbeat(
  //   foodPosition: { posXcl: number; posYcl: number },
  //   gridSizeYcl: number,
  //   gridSizeXcl: number,
  //   direction: string,
  //   blockPosition: { posXcl: number; posYcl: number },
  //   onTick?: () => void
  // ): void
  // stopHeartbeat(): void
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
