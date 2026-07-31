import { ISnake, ISnakePart, direction } from "./types.js";

export class Snake implements ISnake {
  private parts: ISnakePart[]
  startXcl: number
  startYcl: number

  constructor(startXcl: number, startYcl: number, length: number = 3) {
    this.parts = []
    this.startXcl = startXcl
    this.startYcl = startYcl

    for (let i = 0; i < length; i++) {
      this.parts.push({
        posXcl: startXcl - i,
        posYcl: startYcl,
        type: i === 0 ? "head" : i === length - 1 ? "tail" : "body"
      })
    }
  }

  generationSnakePosition(gridSizeYcl: number, gridSizeXcl: number) {
    const min = 2
    const maxXcl = Math.floor(gridSizeXcl)
    const maxYcl = Math.floor(gridSizeYcl)
    this.startXcl = Math.floor(Math.random() * (maxXcl - min)) + min
    this.startYcl = Math.floor(Math.random() * (maxYcl - min)) + min
  }

  getLength(): number {
    return this.parts.length
  }

  getParts(): Array<ISnakePart> {
    return this.parts
  }

  // setPartsViaEatting(prevParts: Array<ISnakePart>, food: { posXcl: number; posYcl: number }) {
  //   const head = this.parts[0]
  //   const isAte = head.posXcl === food.posXcl && head.posYcl === food.posYcl
  //   const nextParts = [...prevParts]

  //   if (isAte) {
  //     nextParts.push({
  //       posXcl: prevParts[prevParts.length - 1].posXcl,
  //       posYcl: prevParts[prevParts.length - 1].posYcl,
  //       type: 'tail',
  //     })
  //     prevParts[prevParts.length - 1].type = 'body'
  //   }

  //   return nextParts
  // }

  setPartsViaEatting() {
    const tail = this.parts[this.parts.length - 1]
    this.parts.push({
      posXcl: tail.posXcl,
      posYcl: tail.posYcl,
      type: "tail",
    })

    if (this.parts.length > 1) {
      this.parts[this.parts.length - 2].type = "body"
    }
  }

  // changePartsPosition(prevParts: Array<ISnakePart>, gridSizeYcl: number, gridSizeXcl: number, direction: string) {
  //   const nextParts = prevParts.map(part => ({ ...part }))

  //   for (let i = 0; i < nextParts.length; i++) {
  //     if (nextParts[i].type === 'head') {
  //       switch (direction) {
  //         case 'right':
  //           nextParts[i].posXcl = nextParts[i].posXcl === gridSizeXcl - 1 ? 0 : nextParts[i].posXcl + 1
  //           break
  //         case 'left':
  //           nextParts[i].posXcl = nextParts[i].posXcl === 0 ? gridSizeXcl - 1 : nextParts[i].posXcl - 1
  //           break
  //         case 'up':
  //           nextParts[i].posYcl = nextParts[i].posYcl === 0 ? gridSizeYcl - 1 : nextParts[i].posYcl - 1
  //           break
  //         case 'down':
  //           nextParts[i].posYcl = nextParts[i].posYcl === gridSizeYcl - 1 ? 0 : nextParts[i].posYcl + 1
  //           break
  //         default:
  //           break
  //       }
  //     } else {
  //       nextParts[i].posXcl = prevParts[i - 1].posXcl
  //       nextParts[i].posYcl = prevParts[i - 1].posYcl
  //     }
  //   }

  //   return nextParts
  // }

  changePartsPosition(gridSizeYcl: number, gridSizeXcl: number, direction: direction) {
    const prevParts = this.parts.map(part => ({ ...part }))
    const nextParts = prevParts.map(part => ({ ...part }))

    for (let i = 0; i < nextParts.length; i++) {
      if (nextParts[i].type === "head") {
        switch (direction) {
          case "right":
            nextParts[i].posXcl = nextParts[i].posXcl === gridSizeXcl - 1 ? 0 : nextParts[i].posXcl + 1
            break
          case "left":
            nextParts[i].posXcl = nextParts[i].posXcl === 0 ? gridSizeXcl - 1 : nextParts[i].posXcl - 1
            break
          case "up":
            nextParts[i].posYcl = nextParts[i].posYcl === 0 ? gridSizeYcl - 1 : nextParts[i].posYcl - 1
            break
          case "down":
            nextParts[i].posYcl = nextParts[i].posYcl === gridSizeYcl - 1 ? 0 : nextParts[i].posYcl + 1
            break
        }
      } else {
        nextParts[i].posXcl = prevParts[i - 1].posXcl
        nextParts[i].posYcl = prevParts[i - 1].posYcl
      }
    }

    this.parts = nextParts
  }

  // !Нужно ли объединять collisionWithBody и collisionWithBlock? Ведь они оба про столкноввение!

  // collisionWithBody() {
  //   const head = this.parts[0]
  //   const partsWithoutHead = this.parts.slice(1)
  //   const isCollision = partsWithoutHead?.find(part => part.posXcl === head?.posXcl && part.posYcl === head.posYcl)

  //   if (isCollision) {
  //     this.stopHeartbeat()
  //   }
  // }

  collisionWithBody(): boolean {
    const head = this.parts[0]
    const partsWithoutHead = this.parts.slice(1)
    return partsWithoutHead.some(part => part.posXcl === head.posXcl && part.posYcl === head.posYcl)
  }

  // collisionWithBlock(blockPosition: { posXcl: number; posYcl: number }) {
  //   const head = this.parts[0]
  //   const isCollision = head.posXcl === blockPosition.posXcl && head.posYcl === blockPosition.posYcl

  //   if (isCollision) {
  //     this.stopHeartbeat()
  //   }
  // }

  collisionWithBlock(blockPosition: { posXcl: number; posYcl: number }): boolean {
    const head = this.parts[0]
    return head.posXcl === blockPosition.posXcl && head.posYcl === blockPosition.posYcl
  }

  // heartbeat(
  //   foodPosition: { posXcl: number; posYcl: number },
  //   gridSizeYcl: number,
  //   gridSizeXcl: number,
  //   direction: string,
  //   blockPosition: { posXcl: number; posYcl: number },
  //   onTick?: () => void
  // ): void {
  //   this.timerId = window.setInterval(() => {
  //     this.parts = this.changePartsPosition(this.parts, gridSizeYcl, gridSizeXcl, direction)
  //     this.parts = this.setPartsViaEatting(this.parts, foodPosition)
  //     this.collisionWithBody()
  //     this.collisionWithBlock(blockPosition)
  //     // !Если зажать клавишу, то змея начинает перемещаться слишком быстро, что бы съесть яблоко!
  //     // !Бывает даже с нормальной скоростью не съедает яблоко!
  //     // !То же самое бывает со столкновением с блоком!
  //     onTick?.()
  //   }, 200)
  // }

  // stopHeartbeat(): void {
  //   if (this.timerId !== undefined) {
  //     clearInterval(this.timerId)
  //     this.timerId = undefined
  //   }
  // }
}