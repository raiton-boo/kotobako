// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://raiton-boo.github.io',
  base: '/kotobako',

  integrations: [sitemap()],

  vite: {
    // @ts-ignore - Vite プラグインの型の不一致を無視
    plugins: [tailwindcss()],
  },

  build: {
    inlineStylesheets: 'auto',
    format: 'file', // 404ページのルーティング用
  },

  compressHTML: true,

  // トレーリングスラッシュの処理
  trailingSlash: 'ignore',

  // 404ページの設定
  output: 'static',

  // プリフェッチ設定
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
