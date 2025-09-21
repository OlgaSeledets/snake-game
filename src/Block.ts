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
}

export class GrassBlock extends Block {
  constructor(posXcl: number, posYcl: number) {
    super("grass", posXcl, posYcl)
  }
}

const newGrassBlock = new GrassBlock(2, 3)
