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
		<div style={{ display: "flex", alignItems: "center", flexDirection: "column", margin: "0 auto", padding: '40px 45px' }}>
			<div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative', }}>
				<Link
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '130px',
						height: '48px',
						gap: '5px',
						backgroundColor: '#000711',
						border: '0.8px solid #025671',
						borderRadius: '15px',
						color: '#FFFFFF',
						fontSize: '16px',
						textDecoration: 'none',
						cursor: 'pointer',
						flexShrink: 0,
					}}
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
					<img
						src={`${import.meta.env.BASE_URL}img/home.png`}
						alt="Menu"
						style={{ width: '40px', height: '40px' }}
					/>
					<span>MENU</span>
				</Link>
				<img
					style={{
						width: '455px',
						height: '152px',
						position: 'absolute',
						left: '50%',
						transform: 'translateX(-50%)',
					}}
					src={`${import.meta.env.BASE_URL}img/logo-snake.png`}
				/>
			</div>
			<div style={{
				display: "flex",
				flexDirection: 'column',
				alignItems: 'center',
				margin: '25px 0',
				paddingTop: '8px',
				width: '228px',
				height: '60px',
				border: '0.8px solid #025671',
				borderRadius: '15px',
				backgroundColor: '#001219'
			}}>
				<span style={{ color: '#FFFFFF', fontSize: '16px' }}>SCORE</span>
				<span style={{ fontSize: '32px', color: '#B2E904' }}>{game.score}</span>
			</div>
			<div style={{ display: 'flex', gap: '35px', alignItems: 'flex-start' }}>
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '30px',
					width: '196px',
					background: '#001219',
					padding: '15px',
					border: '1px solid #5F7D00',
					borderRadius: '15px'
				}}>
					<div style={{ display: 'flex', gap: '20px' }}>
						<img style={{ width: '50px', height: '50px' }} src={`${import.meta.env.BASE_URL}img/best-score.png`} />
						<div style={{ display: 'flex', flexDirection: 'column', paddingTop: '6px' }}>
							<span style={{ color: '#FFFFFF', fontSize: '14px' }}>BEST SCORE</span>
							<span style={{ color: '#B2E904', fontSize: '24px' }}>{localStorage.getItem("theBestScore")}</span>
						</div>
					</div>
					<line style={{
						margin: 'auto',
						width: '145px',
						height: '0.8px',
						backgroundColor: '#5F7D00',
					}} />
					<div style={{ display: 'flex', gap: '20px' }}>
						<img style={{ width: '50px', height: '50px' }} src={`${import.meta.env.BASE_URL}img/snake.png`} />
						<div style={{ display: 'flex', flexDirection: 'column', paddingTop: '6px' }}>
							<span style={{ color: '#FFFFFF', fontSize: '14px' }}>SNAKE LENGTH</span>
							<span style={{ color: '#B2E904', fontSize: '24px' }}>{game.snake.getLength()}</span>
						</div>
					</div>
					<line style={{
						margin: 'auto',
						width: '145px',
						height: '0.8px',
						backgroundColor: '#5F7D00',
					}} />
					<div style={{ display: 'flex', gap: '20px' }}>
						<img style={{ width: '50px', height: '50px' }} src={`${import.meta.env.BASE_URL}img/apple.png`} />
						<div style={{ display: 'flex', flexDirection: 'column', paddingTop: '6px' }}>
							<span style={{ color: '#FFFFFF', fontSize: '14px' }}>FOOD EATEN</span>
							<span style={{ color: '#B2E904', fontSize: '24px' }}>test</span>
						</div>
					</div>
				</div>
				<div style={{
					border: '2px solid #B2E904',
					borderRadius: '15px',
					padding: '7px',
					backgroundColor: '#001219'
				}}>
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
						<img
							src={`${import.meta.env.BASE_URL}img/apple-food.png`}
							alt="apple"
							style={{
								position: "absolute",
								left: `${game.food.posXcl * cellSizePx + ((cellSizePx - cellSizePx / 1.4) / 2)}px`,
								top: `${game.food.posYcl * cellSizePx + ((cellSizePx - cellSizePx / 1.4) / 2)}px`,
								width: `${cellSizePx / 1.4}px`,
								height: `${cellSizePx / 1.4}px`
							}}
						/>
						<img
							src={`${import.meta.env.BASE_URL}img/stone.png`}
							alt="stone"
							style={{
								position: "absolute",
								left: `${game.block.posXcl * cellSizePx + 1}px`,
								top: `${game.block.posYcl * cellSizePx + 1}px`,
								width: `${cellSizePx}px`,
								height: `${cellSizePx}px`,
							}}
						/>
						{parts.map((part, i) => (
							<div key={i} style={{
								position: "absolute",
								left: `${part.posXcl * cellSizePx}px`,
								top: `${part.posYcl * cellSizePx}px`,
								// width: `${cellSizePx}px`,
								// height: `${cellSizePx}px`,
								// backgroundColor: part.type === "head" ? "darkBlue" : "blue",
								// borderRadius: "50%"
							}}>
								{part.type === "head"
									? <img style={{ width: `${cellSizePx}px`, height: `${cellSizePx}px` }} src={`${import.meta.env.BASE_URL}img/head.png`} />
									: part.type === "tail"
										? <img style={{ width: `${cellSizePx}px`, height: `${cellSizePx}px` }} src={`${import.meta.env.BASE_URL}img/tail.png`} />
										: <img style={{ width: `${cellSizePx}px`, height: `${cellSizePx}px` }} src={`${import.meta.env.BASE_URL}img/body.png`} />}
							</div>
						))}
					</div>
				</div>
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '30px',
					width: '196px',
					background: '#001219',
					padding: '15px',
					border: '1px solid #025671',
					borderRadius: '15px'
				}}>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
						<img style={{ width: '30px', height: '30px' }} src={`${import.meta.env.BASE_URL}img/how-to-play.png`} />
						<span style={{ color: '#04F9FC', fontSize: '16px' }}>HOW TO PLAY</span>
					</div>
					<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
						<img style={{ width: '53px', height: '53px' }} src={`${import.meta.env.BASE_URL}img/arrows.png`} />
						<span style={{ color: '#FFFFFF', fontSize: '16px' }}>Use arrow keys to move</span>
					</div>
					<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
						<img style={{ width: '50px', height: '50px' }} src={`${import.meta.env.BASE_URL}img/apple-food.png`} />
						<span style={{ color: '#FFFFFF', fontSize: '16px' }}>Eat food to grow longer</span>
					</div>
					<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
						<img style={{ width: '50px', height: '50px' }} src={`${import.meta.env.BASE_URL}img/stone.png`} />
						<span style={{ color: '#FFFFFF', fontSize: '16px' }}>Avoid hitting the stone or yourself</span>
					</div>
				</div>
			</div>
			{isBtnStartVisible ? (
				<div style={{ display: 'flex', gap: '25px' }}>
					<button
						className="gameBtn gameBtn--start"
						onClick={() => {
							setBtnStartIsVisible(false)
							setStart(true)
						}}
					>
						<img style={{ width: '52px', height: '52px' }} src={`${import.meta.env.BASE_URL}img/play.png`} />
						START GAME
					</button>
					<button className="loadGameBtn" onClick={() => setIsDownloadFromFile(true)}>
						<img style={{ width: '52px', height: '52px' }} src={`${import.meta.env.BASE_URL}img/load-game.png`} />
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<span style={{ color: '#24D6DD', fontSize: '24px' }}>LOAD GAME</span>
							<span style={{ color: '#47B3B3', fontSize: '16px' }}>Load from file</span>
						</div>
					</button>
				</div>
			) : (
				<button
					style={{
						display: 'flex',
						gap: '10px',
						padding: '10px'
					}}
					className="gameBtn"
					onClick={() => {
						restartGame()
						setBtnStartIsVisible(true)
					}}
				>
					<img style={{ width: '32px', height: '32px' }} src={`${import.meta.env.BASE_URL}img/restart.png`} />
					RESTART
				</button>
			)}
			{game.gameOver && <p>GAME OVER</p>}
		</div>
	)
}