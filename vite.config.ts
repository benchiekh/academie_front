import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  preview: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: ['academie-front.onrender.com', 'localhost', '0.0.0.0']
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
})
