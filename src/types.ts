export interface ISnakeGame {
  readonly grid: IGrid
  // readonly snake: ISnake
  readonly score: number
}

export interface IGrid {
  sizeXcl: number
  sizeYcl: number
  cellSizePx: number
  getCells(): Generator<{posXcl: number, posYcl: number}>
}

export interface IBlock {
  type: string
  posXcl: number
  posYcl: number
}

export interface ISnake {
  getLength(): number
  getParts(): ReadonlyArray<ISnakePart>
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
}
