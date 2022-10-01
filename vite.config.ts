import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import vuejsx from '@vitejs/plugin-vue-jsx';
import Unocss from 'unocss/vite';
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    vuejsx(),
    Unocss({
      preprocess: matcher => {
        return matcher.startsWith('un-') ? matcher.slice(3) : undefined;
      },
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
      theme: {
        colors: {
          primary: '#3eaf7c',
        },
        fontFamily: {
          mono: 'var(--vt-font-family-mono)',
        },
      },
      transformers: [transformerDirectives(), transformerVariantGroup()],
      rules: [
        [/^un-m-(\d)$/, ([, d]) => ({ margin: `${Number(d) / 4}rem` }), { layer: 'utilities' }],
        // when you omit the layer, it will be `default`
        ['btn', { padding: '4px' }],
      ],
    }),
  ],
});
