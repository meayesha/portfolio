import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolio/',   // ⬅️ THIS is the missing piece
  plugins: [react()],
})
