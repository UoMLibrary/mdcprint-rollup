// import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs"; // This addressed the jspdf import issue along with inlineDynamic imports

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
  inlineDynamicImports: true,
  input: "src/scripts/main.js",
  //   output: [{ file: pkg.main, format: "iife", name }],
  output: [{ file: pkg.main, format: "esm" }],
  plugins: [terser(), resolve(), commonjs()],
  //plugins: [resolve(), commonjs()],
};
