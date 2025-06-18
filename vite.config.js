import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/memehustle/', // 👈 this is CRUCIAL!
  plugins: [react()],
})
