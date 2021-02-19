import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'
import img from 'rollup-plugin-img'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import json from '@rollup/plugin-json'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'

const extensions = ['.tsx', '.ts', '.js', '.jsx', '.css']
const isDevelopmentMode = process.env.NODE_ENV !== 'prod'

export default {
  input: ['src/oov-spa.tsx'],
  output: {
    name: 'oov-spa',
    dir: 'dist',
    format: 'es',
    sourcemap: isDevelopmentMode,
  },
  treeshake: !isDevelopmentMode,
  preserveEntrySignatures: false,
  plugins: [
    del({ targets: ['dist/*.css', 'dist/*.js', 'dist/static'] }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    json(),
    postcss({
      extract: 'css/oov-spa.css',
      plugins: [postcssImport],
    }),
    babel({
      extensions,
      babelHelpers: 'bundled',
      presets: ['solid', '@babel/preset-typescript'],
    }),
    resolve({ extensions }),
    commonjs(),
    copy({
      overwrite: true,
      targets: [
        { src: './node_modules/@fortawesome/fontawesome-free/webfonts/*', dest: './dist/webfonts' },
        { src: './static/*', dest: './dist/static' },
      ],
    }),
    img({ output: 'dist/static' }),
    isDevelopmentMode && serve({ contentBase: 'dist', host: 'localhost', port: 3000 }),
    isDevelopmentMode && livereload({ watch: 'dist', verbose: true }),
  ],
}
