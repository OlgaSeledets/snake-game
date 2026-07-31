import { IFood } from "./types.js";

export abstract class Food implements IFood {
  type: string
  posXcl: number
  posYcl: number

  constructor(type: string, posXcl: number, posYcl: number) {
    this.type = type
    this.posXcl = posXcl
    this.posYcl = posYcl
  }

  generationFoodPosition(gridSizeYcl: number, gridSizeXcl: number) {
    const maxXcl = Math.floor(gridSizeXcl)
    const maxYcl = Math.floor(gridSizeYcl)
    this.posXcl = Math.floor(Math.random() * maxXcl)
    this.posYcl = Math.floor(Math.random() * maxYcl)
  }
}

export class AppleFood extends Food {
  constructor(posXcl: number, posYcl: number) {
    super('apple', posXcl, posYcl)
  }
}