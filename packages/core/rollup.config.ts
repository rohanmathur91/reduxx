import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import * as pkg from "./package.json";

const INPUT_FILE = "./src/index.ts";

export default [
  // CommonJS build
  {
    input: INPUT_FILE,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "auto",
    },
    plugins: [
      resolve(),
      commonjs({
        transformMixedEsModules: true,
      }),
      typescript({
        tsconfig: "./tsconfig.cjs.json",
      }),
    ],
    external: [],
  },
  // ESM build
  {
    input: INPUT_FILE,
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs({
        transformMixedEsModules: true,
      }),
      typescript({
        tsconfig: "./tsconfig.esm.json",
      }),
    ],
    external: [],
  },

  // UMD build
  {
    input: INPUT_FILE,
    output: [
      {
        file: pkg.unpkg,
        format: "umd",
        name: pkg.name,
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      resolve(),
      commonjs({
        transformMixedEsModules: true,
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
      }),
    ],
    external: [],
  },
];
