import {
    defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from 'vite-jsconfig-paths'

// /minigame/
export default defineConfig({
    plugins: [react(), jsconfigPaths()],
    server: {
        port: 3001,
    },
    base: "/minigame/"
})