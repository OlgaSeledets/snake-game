import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function MenuPage({
	sizeXcl,
	sizeYcl,
	cellSizePx,
	setSizeX,
	setSizeY,
	setCellSize,
	applyGridSize,
}: {
	sizeXcl: number,
	sizeYcl: number,
	cellSizePx: number,
	setSizeX: (value: number) => void,
	setSizeY: (value: number) => void,
	setCellSize: (value: number) => void,
	applyGridSize: (x: number, y: number, cell: number) => void,
}) {
	const navigate = useNavigate()

	const [sizeXFromLocalStorage, setSizeXFromLocalStorage] = useState<number>(() => Number(localStorage.getItem("sizeXcl") ?? sizeXcl))
	const [sizeYFromLocalStorage, setSizeYFromLocalStorage] = useState<number>(() => Number(localStorage.getItem("sizeYcl") ?? sizeYcl))
	const [cellSizePxFromLocalStorage, setCellSizePxFromLocalStorage] = useState<number>(() => Number(localStorage.getItem("cellSizePx") ?? cellSizePx))

	const handleApply = () => {
		localStorage.setItem("sizeXcl", String(sizeXFromLocalStorage))
		localStorage.setItem("sizeYcl", String(sizeYFromLocalStorage))
		localStorage.setItem("cellSizePx", String(cellSizePxFromLocalStorage))

		setSizeX(sizeXFromLocalStorage)
		setSizeY(sizeYFromLocalStorage)
		setCellSize(cellSizePxFromLocalStorage)
		applyGridSize(sizeXFromLocalStorage, sizeYFromLocalStorage, cellSizePxFromLocalStorage)
		navigate("/game")
	}

	return (
		<div style={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			margin: '0 auto',
		}}>
			<img style={{ width: '684px', height: '228px' }} src={`${import.meta.env.BASE_URL}img/logo-snake.png`} />
			<div
				style={{
					position: 'absolute',
					marginTop: '185px',
					padding: '8px',
					width: '285px',
					height: '80px',
					boxSizing: 'border-box',
					color: '#caff00',
					textAlign: 'center',
					background: 'rgba(0, 18, 25, 0.5)',
					clipPath: 'polygon(0 0, 100% 0, 92% 100%, 8% 100%)',
					// borderRadius: '25px',
				}}
			>
				<div>
					<span>★</span>
					<span style={{ margin: '0 12px' }}>BEST SCORE</span>
					<span>★</span>
				</div>

				<div
					style={{
						fontSize: '42px',
						fontWeight: 700,
						lineHeight: 1.1,
					}}
				>
					{localStorage.getItem("theBestScore")}
				</div>
			</div>
			<div style={{
				width: '490px',
				height: '224px',
				background: '#001219',
				marginTop: '65px',
				borderRadius: '25px',
				boxShadow: '0px 4px 10px 0px rgba(0, 187, 255, 0.5)',
			}}>
				<div style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-around',
				}}>
					<line style={{
						width: '84px',
						height: '1px',
						backgroundColor: '#02ACE4',
					}} />
					<div style={{
						display: 'flex',
						alignItems: 'center',
						gap: '10px',
					}}>
						<img style={{ width: '33px', height: '33px' }} src={`${import.meta.env.BASE_URL}img/settings.png`} />
						<h2 style={{ fontSize: '20px', color: '#02ACE4' }}>GAME SETTINGS</h2>
					</div>
					<line style={{
						width: '84px',
						height: '1px',
						backgroundColor: '#02ACE4',
					}} />
				</div>
				<div style={{ padding: '0px 20px 0 13px', display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<img style={{ width: '43px', height: '43px' }} src={`${import.meta.env.BASE_URL}img/sizeX.png`} />
						<div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
							<span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>Columns</span>
							<span style={{ color: '#4D575E', fontSize: '14px', fontWeight: 600 }}>Grid width (number of columns)</span>
						</div>
						<div style={{ display: 'flex', marginLeft: 'auto' }}>
							<button style={{
								width: '42px',
								border: 'none',
								background: '#061b24',
								color: '#8fd9f0',
								fontSize: '22px',
								cursor: 'pointer'
							}}
								onClick={() => setSizeXFromLocalStorage(v => Math.max(5, v - 1))}>
								−
							</button>
							<div style={{
								width: '70px',
								textAlign: 'center',
								background: '#03151d',
								color: '#bfff00',
								fontSize: '24px',
								fontWeight: 700,
								padding: '8px',
							}}>
								{sizeXFromLocalStorage}
							</div>
							<button style={{
								width: '42px',
								border: 'none',
								background: '#061b24',
								color: '#8fd9f0',
								fontSize: '22px',
								cursor: 'pointer'
							}}
								onClick={() => setSizeXFromLocalStorage(v => v + 1)}>
								+
							</button>
						</div>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<img style={{ width: '43px', height: '43px' }} src={`${import.meta.env.BASE_URL}img/sizeY.png`} />
						<div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
							<span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>Rows</span>
							<span style={{ color: '#4D575E', fontSize: '14px', fontWeight: 600 }}>Grid height (number of rows)</span>
						</div>
						<div style={{ display: 'flex', marginLeft: 'auto' }}>
							<button style={{
								width: '42px',
								border: 'none',
								background: '#061b24',
								color: '#8fd9f0',
								fontSize: '22px',
								cursor: 'pointer'
							}}
								onClick={() => setSizeYFromLocalStorage(v => Math.max(5, v - 1))}>
								−
							</button>
							<div style={{
								width: '70px',
								textAlign: 'center',
								background: '#03151d',
								color: '#bfff00',
								fontSize: '24px',
								fontWeight: 700,
								padding: '8px',
							}}>
								{sizeYFromLocalStorage}
							</div>
							<button style={{
								width: '42px',
								border: 'none',
								background: '#061b24',
								color: '#8fd9f0',
								fontSize: '22px',
								cursor: 'pointer'
							}}
								onClick={() => setSizeYFromLocalStorage(v => v + 1)}>
								+
							</button>
						</div>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<img style={{ width: '43px', height: '43px' }} src={`${import.meta.env.BASE_URL}img/cellPx.png`} />
						<div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
							<span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>Cells</span>
							<span style={{ color: '#4D575E', fontSize: '14px', fontWeight: 600 }}>Size of each cell in pixels</span>
						</div>
						<div style={{ display: 'flex', marginLeft: 'auto' }}>
							<button style={{
								width: '42px',
								border: 'none',
								background: '#061b24',
								color: '#8fd9f0',
								fontSize: '22px',
								cursor: 'pointer'
							}}
								onClick={() => setCellSizePxFromLocalStorage(v => Math.max(5, v - 1))}>
								−
							</button>
							<div style={{
								width: '70px',
								textAlign: 'center',
								background: '#03151d',
								color: '#bfff00',
								fontSize: '24px',
								fontWeight: 700,
								padding: '8px',
							}}>
								{cellSizePxFromLocalStorage}
							</div>
							<button style={{
								width: '42px',
								border: 'none',
								background: '#061b24',
								color: '#8fd9f0',
								fontSize: '22px',
								cursor: 'pointer'
							}}
								onClick={() => setCellSizePxFromLocalStorage(v => v + 1)}>
								+
							</button>
						</div>
					</div>
				</div>
			</div>
			<button className="gameBtn gameBtn--play" onClick={() => handleApply()}>
				<img style={{ width: '52px', height: '52px' }} src={`${import.meta.env.BASE_URL}img/play.png`} />
				PLAY
			</button>
			<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
				<div style={{
					width: '304px',
					height: '65px',
					background: 'rgba(0, 18, 25, 0.5)',
					borderRadius: '25px',
					boxShadow: '0px 4px 10px 0px rgba(0, 187, 255, 0.5)',
					marginLeft: '92px'
				}}>
					<div style={{ display: 'flex', alignItems: 'center', padding: '12px', gap: '18px' }}>
						<img style={{ width: '43px', height: '43px' }} src={`${import.meta.env.BASE_URL}img/information.png`} />
						<span style={{ fontSize: '16px', color: '#4D575E', fontWeight: 600 }}>Use arrow keys to control the snake and eat food</span>
					</div>
				</div>
				<div style={{
					width: '248px',
					height: '65px',
					background: 'rgba(0, 18, 25, 0.5)',
					borderRadius: '25px',
					boxShadow: '0px 4px 10px 0px rgba(0, 187, 255, 0.5)',
					marginRight: '92px'
				}}>
					<div style={{ display: 'flex', alignItems: 'center', padding: '0 35px', gap: '18px' }}>
						<img style={{ width: '73px', height: '73px' }} src={`${import.meta.env.BASE_URL}img/arrows.png`} />
						<span style={{ fontSize: '16px', color: '#4D575E', fontWeight: 600 }}>Arrow keys to move</span>
					</div>
				</div>
			</div>
		</div>
	)
}