import { Route, Routes } from "react-router-dom";
import { ISnakeGame } from "./types.js";
import GamePage from "./pages/GamePage.js";
import MenuPage from "./pages/MenuPage.js";
import { useState } from "react";
import { Grid } from "./Grid.js";
import { AppleFood } from "./Food.js";
import { StoneBlock } from "./Block.js";
import { Snake } from "./Snake.js";
import { SnakeGame } from "./SnakeGame.js";

export default function App({ game }: { game: ISnakeGame }) {
  const initialSizeX = Number(localStorage.getItem("sizeXcl") ?? game.grid.sizeXcl)
  const initialSizeY = Number(localStorage.getItem("sizeYcl") ?? game.grid.sizeYcl)
  const initialCellSize = Number(localStorage.getItem("cellSizePx") ?? game.grid.cellSizePx)

  const [sizeXcl, setSizeX] = useState(initialSizeX)
  const [sizeYcl, setSizeY] = useState(initialSizeY)
  const [cellSizePx, setCellSize] = useState(initialCellSize)

  const useStoredGrid = localStorage.getItem("sizeXcl") != null || localStorage.getItem("sizeYcl") != null || localStorage.getItem("cellSizePx") != null

  const [initGame, setInitGame] = useState<ISnakeGame>(() => {
    const grid = new Grid(initialSizeX, initialSizeY, initialCellSize)
    if (useStoredGrid) {
      game.food.generationFoodPosition(sizeXcl, sizeYcl)
      const food = new AppleFood(game.food.posXcl, game.food.posYcl)
      game.block.generationBlockPosition(sizeXcl, sizeYcl)
      const block = new StoneBlock(game.block.posXcl, game.block.posYcl)
      game.snake.generationSnakePosition(sizeXcl, sizeYcl)
      const snake = new Snake(game.snake.startXcl, game.snake.startYcl, 3)
      return new SnakeGame(grid, food, block, snake)
    }
    else {
      const food = new AppleFood(game.food.posXcl, game.food.posYcl)
      const block = new StoneBlock(game.block.posXcl, game.block.posYcl)
      const snake = new Snake(
        game.snake.getParts()[0].posXcl,
        game.snake.getParts()[0].posYcl,
        game.snake.getLength()
      )
      return new SnakeGame(grid, food, block, snake)
    }
  })

  const applyGridSize = (x: number, y: number, cell: number) => {
    const newGrid = new Grid(x, y, cell)
    const newFood = new AppleFood(
      Math.min(newGrid.sizeXcl - 1, initGame.food.posXcl),
      Math.min(newGrid.sizeYcl - 1, initGame.food.posYcl)
    )
    const newBlock = new StoneBlock(
      Math.min(newGrid.sizeXcl - 1, initGame.block.posXcl),
      Math.min(newGrid.sizeYcl - 1, initGame.block.posYcl)
    )
    const newSnake = new Snake(
      Math.min(newGrid.sizeXcl - 1, initGame.snake.getParts()[0].posXcl),
      Math.min(newGrid.sizeYcl - 1, initGame.snake.getParts()[0].posYcl),
      initGame.snake.getLength()
    )

    const newGame = new SnakeGame(newGrid, newFood, newBlock, newSnake)
    setInitGame(newGame)
  }

  return (
    <Routes>
      <Route path="/game" element={
        <GamePage
          game={initGame}
          sizeXcl={sizeXcl}
          sizeYcl={sizeYcl}
          cellSizePx={cellSizePx}
          setSizeX={setSizeX}
          setSizeY={setSizeY}
          setCellSize={setCellSize}
          setInitGame={setInitGame}
        />
      } />
      <Route path="/" element={
        <MenuPage
          sizeXcl={sizeXcl}
          sizeYcl={sizeYcl}
          cellSizePx={cellSizePx}
          setSizeX={setSizeX}
          setSizeY={setSizeY}
          setCellSize={setCellSize}
          applyGridSize={applyGridSize}
        />
      } />
    </Routes>
  )
}
