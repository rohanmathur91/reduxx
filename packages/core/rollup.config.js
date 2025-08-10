import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const pkg = require("./package.json");

const INPUT_FILE = "./src/index.ts";

export default [
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
      typescript({
        tsconfig: "./tsconfig.esm.json",
      }),
    ],
    external: ["lodash", ...Object.keys(pkg.peerDependencies || {})],
  },
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
      typescript({
        tsconfig: "./tsconfig.cjs.json",
      }),
    ],
    external: ["lodash", ...Object.keys(pkg.peerDependencies || {})],
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
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
      }),
    ],
    external: ["lodash", ...Object.keys(pkg.peerDependencies || {})],
  },
];
