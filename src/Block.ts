import { IBlock } from "./types.js"

export abstract class Block implements IBlock {
  type: string
  posXcl: number
  posYcl: number

  constructor(type: string, posXcl: number, posYcl: number) {
    this.type = type
    this.posXcl = posXcl
    this.posYcl = posYcl
  }

  generationBlockPosition(gridSizeYcl: number, gridSizeXcl: number) {
    const maxXcl = Math.floor(gridSizeXcl)
    const maxYcl = Math.floor(gridSizeYcl)
    this.posXcl = Math.floor(Math.random() * maxXcl)
    this.posYcl = Math.floor(Math.random() * maxYcl)
  }
}

export class StoneBlock extends Block {
  constructor(posXcl: number, posYcl: number) {
    super("stone", posXcl, posYcl)
  }
}

// const newGrassBlock = new GrassBlock(2, 3)
