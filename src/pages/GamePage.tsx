import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { SnakeGame } from "../SnakeGame.js"
import { Grid } from "../Grid.js"
import { AppleFood } from "../Food.js"
import { StoneBlock } from "../Block.js"
import { Snake } from "../Snake.js"
import { ISnakeGame } from "../types.js"

export default function GamePage({
	game,
	sizeXcl,
	sizeYcl,
	cellSizePx,
	setSizeX,
	setSizeY,
	setCellSize,
	setInitGame,
}: {
	game: ISnakeGame,
	sizeXcl: number,
	sizeYcl: number,
	cellSizePx: number,
	setSizeX: (value: number) => void,
	setSizeY: (value: number) => void,
	setCellSize: (value: number) => void,
	setInitGame: (value: ISnakeGame) => void
}) {
	// const [initGame, setInitGame] = useState<ISnakeGame>(game)
	const gridSizeXpx = game.grid.sizeXcl * game.grid.cellSizePx
	const gridSizeYpx = game.grid.sizeYcl * game.grid.cellSizePx
	// const gridSizeXpx = sizeXcl * cellSizePx
	// const gridSizeYpx = sizeYcl * cellSizePx
	const [parts, setParts] = useState(() => game.snake.getParts().map(p => ({ ...p })))
	const [start, setStart] = useState(false)
	const [isBtnStartVisible, setBtnStartIsVisible] = useState(true)
	const [isDownloadFromFile, setIsDownloadFromFile] = useState(false)

	useEffect(() => {
		const handleGlobalKeyDown = (event: KeyboardEvent) => {
			switch (event.key) {
				case "ArrowUp":
					game.setDirection("up")
					break
				case "ArrowDown":
					game.setDirection("down")
					break
				case "ArrowLeft":
					game.setDirection("left")
					break
				case "ArrowRight":
					game.setDirection("right")
					break
			}
		}
		window.addEventListener("keydown", handleGlobalKeyDown)
		return () => window.removeEventListener("keydown", handleGlobalKeyDown)
	}, [game])

	useEffect(() => {
		if (!start) return
		game.startHeartbeat(() => {
			setParts(game.snake.getParts().map(p => ({ ...p })))
		})
		return () => game.stopHeartbeat()
	}, [start, game])

	useEffect(() => {
		if (!isDownloadFromFile) return
		fetch("./src/gameFromJson.json")
			.then(result => result.json())
			.then(jsonData => {
				const newGame = new SnakeGame(
					new Grid(jsonData[0].grid.sizeXcl, jsonData[0].grid.sizeYcl, jsonData[0].grid.cellSizePx),
					new AppleFood(jsonData[0].appleFood.startPosX, jsonData[0].appleFood.startPosY),
					new StoneBlock(jsonData[0].stoneBlock.startPosX, jsonData[0].stoneBlock.startPosY),
					new Snake(jsonData[0].snake.startPosX, jsonData[0].snake.startPosY, jsonData[0].snake.length)
				)
				setInitGame(newGame)
				setParts(newGame.snake.getParts().map(p => ({ ...p })))
				setSizeX(jsonData[0].grid.sizeXcl)
				setSizeY(jsonData[0].grid.sizeYcl)
				setCellSize(jsonData[0].grid.cellSizePx)
				setStart(false)
				setIsDownloadFromFile(false)
			})
	}, [isDownloadFromFile])

	const restartGame = () => {
		const theBestScore = localStorage.getItem("theBestScore")
		if (theBestScore === null || Number(theBestScore) <= game.score) {
			localStorage.setItem("theBestScore", game.score2)
		}
		else {
			localStorage.setItem("theBestScore", theBestScore)
		}
		const grid = new Grid(sizeXcl, sizeYcl, cellSizePx)
		game.food.generationFoodPosition(sizeXcl, sizeYcl)
		const food = new AppleFood(game.food.posXcl, game.food.posYcl)
		game.block.generationBlockPosition(sizeXcl, sizeYcl)
		const block = new StoneBlock(game.block.posXcl, game.block.posYcl)
		game.snake.generationSnakePosition(sizeXcl, sizeYcl)
		const snake = new Snake(game.snake.startXcl, game.snake.startYcl, 3)
		const newGame = new SnakeGame(grid, food, block, snake)
		setInitGame(newGame)
		setParts(newGame.snake.getParts().map(p => ({ ...p })))
		setSizeX(sizeXcl)
		setSizeY(sizeYcl)
		setCellSize(cellSizePx)
		setStart(false)
		setIsDownloadFromFile(false)
	}

	return (
		<div style={{ display: "flex", alignItems: "center", flexDirection: "column", margin: "0 auto" }}>
			<nav>
				<Link
					to="/"
					onClick={() => {
						const theBestScore = localStorage.getItem("theBestScore")
						if (theBestScore === null || Number(theBestScore) <= game.score) {
							localStorage.setItem("theBestScore", game.score2)
						}
						else {
							localStorage.setItem("theBestScore", theBestScore)
						}
						restartGame()
					}}>
					Menu
				</Link>
			</nav>
			<div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
				<span>SCORE</span>
				<span>{game.score}</span>
			</div>
			<div style={{ position: "relative", width: `${gridSizeXpx}px`, height: `${gridSizeYpx}px`, backgroundColor: "green" }}>
				{game.grid.getCells().map((x, i) => (
					<div key={i} style={{
						position: "absolute",
						left: `${x.posXcl * cellSizePx}px`,
						top: `${x.posYcl * cellSizePx}px`,
						width: `${cellSizePx}px`,
						height: `${cellSizePx}px`,
						border: "1px solid black",
						fontSize: "6px"
					}} />
				))}
				<div style={{
					position: "absolute",
					left: `${game.food.posXcl * cellSizePx + cellSizePx / 4}px`,
					top: `${game.food.posYcl * cellSizePx + cellSizePx / 4}px`,
					width: `${cellSizePx / 2}px`,
					height: `${cellSizePx / 2}px`,
					backgroundColor: "red",
					borderRadius: "50%"
				}} />
				<div style={{
					position: "absolute",
					left: `${game.block.posXcl * cellSizePx}px`,
					top: `${game.block.posYcl * cellSizePx}px`,
					width: `${cellSizePx}px`,
					height: `${cellSizePx}px`,
					backgroundColor: "gray"
				}} />
				{parts.map((part, i) => (
					<div key={i} style={{
						position: "absolute",
						left: `${part.posXcl * cellSizePx}px`,
						top: `${part.posYcl * cellSizePx}px`,
						width: `${cellSizePx}px`,
						height: `${cellSizePx}px`,
						backgroundColor: part.type === "head" ? "darkBlue" : "blue",
						borderRadius: "50%"
					}}>
						{part.type === "head" ? "👀" : part.type === "tail" ? "*" : ""}
					</div>
				))}
			</div>
			{isBtnStartVisible ? (
				<div>
					<button
						className="gameBtn"
						onClick={() => {
							setBtnStartIsVisible(false)
							setStart(true)
						}}
					>
						Start GAME
					</button>
					<button className="gameBtn" onClick={() => setIsDownloadFromFile(true)}>
						Download from file
					</button>
				</div>
			) : (
				<button
					className="gameBtn"
					onClick={() => {
						restartGame()
						setBtnStartIsVisible(true)
					}}
				>
					RESTART
				</button>
			)}
			{game.gameOver && <p>GAME OVER</p>}
		</div>
	)
}