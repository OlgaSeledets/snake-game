import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/snake-game/',
  build: {
    outDir: './dist',
  },
  server: {
    port: 3000,
  },
  plugins: [react()],
})
