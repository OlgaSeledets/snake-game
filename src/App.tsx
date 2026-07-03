import { useEffect, useState } from "react"
import { ISnakeGame } from "./types.js"

type direction = 'right' | 'left' | 'up' | 'down'

export default function App({ game }: { game: ISnakeGame }) {
  const gridSizeXpx = game.grid.sizeXcl * game.grid.cellSizePx
  const gridSizeYpx = game.grid.sizeYcl * game.grid.cellSizePx
  const cellSizePx = game.grid.cellSizePx
  const [isClicked, setIsClicked] = useState(false)
  const oldPositions = game.snake.getParts().map(p => ({ posXcl: p.posXcl, posYcl: p.posYcl }))
  const [parts, setParts] = useState(() => game.snake.getParts())
  const [direction, setDirection] = useState<direction>('right')
  const [start, setStart] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (start) {
      game.snake.heartbeat(
        { posXcl: game.food.posXcl, posYcl: game.food.posYcl },
        game.grid.sizeYcl,
        game.grid.sizeXcl,
        direction,
        { posXcl: game.block.posXcl, posYcl: game.block.posYcl },
        () => {
          setParts([...game.snake.getParts()])

          const head = game.snake.getParts()[0]
          const ate = head.posXcl === game.food.posXcl && head.posYcl === game.food.posYcl

          if (ate) {
            game.food.generationFoodPosition(game.grid.sizeYcl, game.grid.sizeXcl)
          }
        }
      )
    }

    return () => game.snake.stopHeartbeat?.()
  }, [game, direction, start])

  ///////////////////////////////

  // !Вынести повторяющийся код управления змеи!

  // const snakeControl = (keyDownType: string) => {
  //   for (let i = 0; i < parts.length; i++) {
  //     if (parts[i].type === 'head') {
  //       if (parts[i].posYcl > oldPositions[i + 1].posYcl) {
  //         return
  //       }
  //       if (parts[i].posYcl === 0) {
  //         parts[i].posYcl = game.grid.sizeYcl
  //       }
  //       parts[i].posYcl = parts[i].posYcl - 1
  //     }
  //     else {
  //       parts[i].posXcl = oldPositions[i - 1].posXcl
  //       parts[i].posYcl = oldPositions[i - 1].posYcl
  //     }
  //   }
  // }

  ////////////////////////////////////

  console.log(isVisible)

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          console.log('Нажата стрелка ВВЕРХ')
          for (let i = 0; i < parts.length; i++) {
            if (parts[i].type === 'head') {
              const nextY = parts[i].posYcl === 0 ? game.grid.sizeYcl - 1 : parts[i].posYcl - 1

              if (nextY === oldPositions[i + 1].posYcl) {
                return
              }

              parts[i].posYcl = nextY
            } else {
              parts[i].posXcl = oldPositions[i - 1].posXcl
              parts[i].posYcl = oldPositions[i - 1].posYcl
            }
          }
          setIsClicked(true)
          setDirection('up')
          break

        case 'ArrowDown':
          console.log('Нажата стрелка ВНИЗ')
          for (let i = 0; i < parts.length; i++) {
            if (parts[i].type === 'head') {
              const nextY = parts[i].posYcl === game.grid.sizeYcl - 1 ? 0 : parts[i].posYcl + 1

              if (nextY === oldPositions[i + 1].posYcl) {
                return
              }

              parts[i].posYcl = nextY
            } else {
              parts[i].posXcl = oldPositions[i - 1].posXcl
              parts[i].posYcl = oldPositions[i - 1].posYcl
            }
          }
          setIsClicked(true)
          setDirection('down')
          break

        case 'ArrowLeft':
          console.log('Нажата стрелка ВЛЕВО')
          for (let i = 0; i < parts.length; i++) {
            if (parts[i].type === 'head') {
              const nextX = parts[i].posXcl === 0 ? game.grid.sizeXcl - 1 : parts[i].posXcl - 1

              if (nextX === oldPositions[i + 1].posXcl) {
                return
              }

              parts[i].posXcl = nextX
            } else {
              parts[i].posXcl = oldPositions[i - 1].posXcl
              parts[i].posYcl = oldPositions[i - 1].posYcl
            }
          }
          setIsClicked(true)
          setDirection('left')
          break

        case 'ArrowRight':
          console.log('Нажата стрелка ВПРАВО')
          for (let i = 0; i < parts.length; i++) {
            if (parts[i].type === 'head') {
              const nextX = parts[i].posXcl === game.grid.sizeXcl - 1 ? 0 : parts[i].posXcl + 1

              if (nextX === oldPositions[i + 1].posXcl) {
                return
              }

              parts[i].posXcl = nextX
            } else {
              parts[i].posXcl = oldPositions[i - 1].posXcl
              parts[i].posYcl = oldPositions[i - 1].posYcl
            }
          }
          setIsClicked(true)
          setDirection('right')
          break

        default:
          break
      }
    }
    setIsClicked(false)
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [isClicked, parts, game.food.posXcl, game.food.posYcl])

  return (
    <>
      <div style={{
        position: 'relative',
        width: `${gridSizeXpx}px`,
        height: `${gridSizeYpx}px`,
        backgroundColor: 'green',
        margin: '0 auto',
        top: '50%',
        marginTop: `${gridSizeXpx / 2}px`,
      }}>

        {game.grid.getCells().map((x, i) => <div key={i} style={{
          position: 'absolute',
          left: `${x.posXcl * cellSizePx}px`,
          top: `${x.posYcl * cellSizePx}px`,
          width: `${cellSizePx}px`,
          height: `${cellSizePx}px`,
          border: '1px solid black',
          fontSize: '6px'
        }}>{`(${x.posXcl}, ${x.posYcl})`}</div>)}

        <div style={{
          position: 'absolute',
          left: `${game.food.posXcl * cellSizePx + (cellSizePx / 4)}px`,
          top: `${game.food.posYcl * cellSizePx + (cellSizePx / 4)}px`,
          width: `${cellSizePx / 2}px`,
          height: `${cellSizePx / 2}px`,
          backgroundColor: 'red',
          borderRadius: '50%',
        }} />

        <div style={{
          position: 'absolute',
          left: `${game.block.posXcl * cellSizePx}px`,
          top: `${game.block.posYcl * cellSizePx}px`,
          width: `${cellSizePx}px`,
          height: `${cellSizePx}px`,
          backgroundColor: 'gray',
        }} />

        <div>
          {parts.map((part, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${part.posXcl * cellSizePx}px`,
              top: `${part.posYcl * cellSizePx}px`,
              width: `${cellSizePx}px`,
              height: `${cellSizePx}px`,
              backgroundColor: part.type === "head" ? "darkBlue" : "blue",
              borderRadius: "50%",
            }}>
              {part.type === "head" && "👀" || part.type === 'tail' && '*'}
            </div>
          ))}
        </div>
      </div>
      {
        isVisible && (
          <button style={{ overflow: isVisible ? 'visible' : 'hidden' }} onClick={() => {
            setIsVisible(false)
            setStart(true)
          }}>Клик</button>
        )
      }
    </>
  )
}
