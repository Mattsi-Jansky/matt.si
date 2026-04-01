import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeFigure from './src/plugins/rehype-figure.mjs';
import copyFigureImages from './src/plugins/copy-figure-images.mjs';

export default defineConfig({
  site: 'https://www.matt.si',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeRaw, rehypeFigure],
    shikiConfig: {
      theme: 'one-dark-pro',
    },
  },
  integrations: [copyFigureImages()],
});
