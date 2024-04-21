import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';

const packageJson = require('./package.json')

export default {
  input: 'src/main.ts',
  output: [{ file: packageJson.main , format: 'cjs', sourceMap: true , }, { file: packageJson.module , format: 'esm', sourceMap: true }],
  plugins: [
    peerDepsExternal(),
    commonjs(),
    typescript({
      useTsConfigDeclarationDir: true
    }),
  ]
}
