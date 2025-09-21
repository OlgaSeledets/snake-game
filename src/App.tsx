import { useState } from "react"
import { ISnakeGame } from "./types.js"
import { SnakeGame } from "./SnakeGame.js"
import { Grid } from "./Grid.js"

export default function App({ game }: { game: ISnakeGame }) {
  const gridSizeXpx = game.grid.sizeXcl * game.grid.cellSizePx
  const gridSizeYpx = game.grid.sizeYcl * game.grid.cellSizePx

  const cellSizePx = game.grid.cellSizePx
  return (
    <div style={{
      position: 'relative',
      width: `${gridSizeXpx}px`,
      height: `${gridSizeYpx}px`,
      backgroundColor: 'skyblue'
    }}>
      {game.grid.getCells().map(x => <div style={{
        position: 'absolute',
        left: `${x.posXcl * cellSizePx}px`,
        top: `${x.posYcl * cellSizePx}px`,
        width: `${cellSizePx}px`,
        height: `${cellSizePx}px`,
        border: '1px solid black',
        fontSize: '6px'
      }}>{`(${x.posXcl}, ${x.posYcl})`}</div>)}
    </div>
  )
}
