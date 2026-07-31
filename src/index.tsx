import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import { SnakeGame } from './SnakeGame.js'
import { Grid } from './Grid.js'
import { AppleFood } from './Food.js'
import { StoneBlock } from './Block.js'
import { Snake } from './Snake.js'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App game={new SnakeGame(new Grid(20, 20, 24), new AppleFood(5, 4), new StoneBlock(2, 3), new Snake(4, 13, 3))} />
    </BrowserRouter>
  </StrictMode>,
)
