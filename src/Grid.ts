import { IGrid } from "./types.js"

export class Grid implements IGrid {
  sizeXcl: number
  sizeYcl: number
  cellSizePx: number

  constructor(sizeXcl: number, sizeYcl: number, cellSizePx: number) {
    this.sizeXcl = sizeXcl
    this.sizeYcl = sizeYcl
    this.cellSizePx = cellSizePx
  }

  *getCells(): Generator<{ posXcl: number; posYcl: number }> {
    for (let posXcl = 0; posXcl < this.sizeXcl; posXcl++) {
      for (let posYcl = 0; posYcl < this.sizeXcl; posYcl++) {
        yield { posXcl, posYcl }
      }
    }
  }
}
