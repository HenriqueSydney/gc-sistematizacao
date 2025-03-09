import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    coverage: {
      provider: 'v8', // ou 'c8', dependendo da sua escolha
      reporter: ['text', 'html'], // Gera relatório no terminal e no HTML
      reportsDirectory: './coverage',
    },
  },
})
