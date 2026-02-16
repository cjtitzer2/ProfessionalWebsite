import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const defaultBasePath = repositoryName ? `/${repositoryName}/` : '/'
const basePath = process.env.VITE_BASE_PATH ?? (process.env.GITHUB_ACTIONS === 'true' ? defaultBasePath : '/')

// https://vite.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: false,
  },
})
