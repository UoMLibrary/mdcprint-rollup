// import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";
// handle importing any node_module modules
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs"; // This addressed the jspdf import issue along with inlineDynamic imports
// Output as ES5 for backwards compatability (babel to the rescue)
import babel from "rollup-plugin-babel";

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
  inlineDynamicImports: true,
  input: "src/scripts/main.js",
  output: [{ file: pkg.main, format: "esm" }],
  plugins: [
    // terser({ comments: false }),
    terser(),
    resolve(),
    commonjs(),
    babel({
      extensions: [".js", ".mjs", ".html", ".svelte"],
      runtimeHelpers: true,
      exclude: ["node_modules/@babel/**"],
      presets: [
        [
          "@babel/preset-env",
          {
            targets: "> 0.25%, not dead",
          },
        ],
      ],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        [
          "@babel/plugin-transform-runtime",
          {
            useESModules: true,
          },
        ],
      ],
    }),
  ],
};
