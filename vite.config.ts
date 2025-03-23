import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'docs',
    target: 'node18',
  },
  base: 'https://oeyoews.github.io/prosemirror-learning'
});
