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
			marginTop: "30px",
			rowGap: "10px",
			width: '500px',
			backgroundColor: 'lightcyan',
			margin: '0 auto',
		}}>
			<h1>Snake Game</h1>
			<div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
				<span>The best SCORE</span>
				<span>{localStorage.getItem("theBestScore")}</span>
			</div>

			<div style={{ width: "250px", border: "1px solid black" }}>
				<div style={{ display: "flex", gap: "25px", justifyContent: "space-between" }}>
					<label>SizeX cl</label>
					<input type="number" min="5" max="40" step="1" value={sizeXFromLocalStorage} onChange={(event) => {
						setSizeXFromLocalStorage(Number(event.target.value))
					}} />
				</div>
				<div style={{ display: "flex", gap: "25px", justifyContent: "space-between" }}>
					<label>SizeY cl</label>
					<input type="number" min="5" max="40" step="1" value={sizeYFromLocalStorage} onChange={(event) => {
						setSizeYFromLocalStorage(Number(event.target.value))
					}} />
				</div>
				<div style={{ display: "flex", gap: "25px", justifyContent: "space-between" }}>
					<label>CellSize px</label>
					<input type="number" min="5" max="40" step="1" value={cellSizePxFromLocalStorage} onChange={(event) => {
						setCellSizePxFromLocalStorage(Number(event.target.value))
					}} />
				</div>
				{/*Теперь и в GamePage надо прописывать условия получать из локального хранилища размеры или нет? Насколько этот вариант хорош?*/}
			</div>
			<button onClick={() => handleApply()}>Apply</button>
		</div>
	)
}