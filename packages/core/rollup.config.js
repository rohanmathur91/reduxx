import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const pkg = require("./package.json");

export default [
  // ESM build
  {
    input: "./core.ts",
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
    input: "./core.ts",
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
    input: "./core.ts",
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
