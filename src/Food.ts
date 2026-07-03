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
    const min = 0
    const maxYcl = Math.floor(gridSizeYcl)
    const maxXcl = Math.floor(gridSizeXcl)
    this.posYcl = Math.floor(Math.random() * (maxYcl - min)) + min
    this.posXcl = Math.floor(Math.random() * (maxXcl - min)) + min
  }
}

export class AppleFood extends Food {
  constructor(posXcl: number, posYcl: number) {
    super('apple', posXcl, posYcl)
  }
}