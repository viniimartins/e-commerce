import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
  splitting: false,
  sourcemap: true,
  clean: true,
  noExternal: ['@e-commerce/auth', '@e-commerce/env'],
})
