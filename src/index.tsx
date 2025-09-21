import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import { SnakeGame } from './SnakeGame.js'
import { Grid } from './Grid.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App game = {new SnakeGame(new Grid(20, 20, 24))}/>
  </StrictMode>,
)
