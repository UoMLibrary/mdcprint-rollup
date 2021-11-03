# Creating a Javascript only version of the pdf print functionality

[Using Rollup](http://rollupjs.org/).

## Rolling it up

https://www.learnwithjason.dev/blog/learn-rollup-js

Detect the ECMA version of the output

https://www.w3schools.com/js/js_versions.asp

https://www.npmjs.com/package/es-check

```bash
npm i es-check -g

# e.g es-check es5 './vendor/js/_.js' './dist/\*\*/_.js'

es-check es5 './build/js/main.min.js'
ES-Check: there were 1 ES version matching errors.

          ES-Check Error:
          ----
          · erroring file: ./build/js/main.min.js
          · error: SyntaxError: The keyword 'const' is reserved (1083:0)
          · see the printed err.stack below for context
          ---- ...
```

Need to run babel against the source to transpile ES6 code e.g

```
export const printButtonClicked = () => {
    ...
```

[.babelrc presets in rollup](https://babeljs.io/docs/en/babel-preset-env)

```json
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
  plugins: [resolve(), commonjs()], // FAST DEV VERSION WITH NO TRANSPILE
  //   plugins: [
  //     terser(),
  //     resolve(),
  //     commonjs(),
  //     babel({
  //       extensions: [".js", ".mjs", ".html", ".svelte"],
  //       runtimeHelpers: true,
  //       exclude: ["node_modules/@babel/**"],
  //       presets: [
  //         [
  //           "@babel/preset-env",
  //           {
  //             targets: "> 0.25%, not dead",
  //           },
  //         ],
  //       ],
  //       plugins: [
  //         "@babel/plugin-syntax-dynamic-import",
  //         [
  //           "@babel/plugin-transform-runtime",
  //           {
  //             useESModules: true,
  //           },
  //         ],
  //       ],
  //     }),
  //   ],
};

```
