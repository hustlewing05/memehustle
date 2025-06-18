// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/meme-hustle/', // 👈 IMPORTANT: your GitHub repo name here
})
