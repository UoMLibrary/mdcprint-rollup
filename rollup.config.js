import babel from "rollup-plugin-babel";
import pkg from "./package.json";

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
  input: "src/scripts/main.js",
  //   output: [{ file: pkg.main, format: "iife", name }],
  output: [{ file: pkg.main, format: "esm" }],
  //   sourceMap: "inline",
  //   plugins: [
  //     babel({
  //       exclude: "node_modules/**",
  //     }),
  //   ],
};
