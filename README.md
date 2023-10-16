# Creating a Javascript only version of the pdf print functionality

## Quickstart

There is an index.html file in the build directory that can be run with live server. This contains an example of the Javascript print component. The Javascript file is approx 740kb but does compress with gzip to about 225kb.

NOTE: The javascript file will need building before the example will work

```bash
./node_modules/.bin/rollup -c -w
```

The example contains references to a few missing files to demonstrate how missing files are rendered into the pdf.

Changes made to the source code in main.js can be automatically rebuilt to the build folder using

```bash
./node_modules/.bin/rollup -c -w
```

The configuraion for the build is in rollup.config.js

There are callback events for each image loading, each page being built and the overall completion of the pdf that can be used for providing feedback to the user.

The pdf is built on the client, all images are downloaded to the client.

The completed_callback returns any image urls that returned errors.

## Rolling it up

[Using Rollup](http://rollupjs.org/).

https://medium.com/stackanatomy/the-ultimate-guide-to-getting-started-with-the-rollup-js-javascript-bundler-2ebec9398656

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
    // plugins: [
    //   terser(),
    //   resolve(),
    //   commonjs(),
    //   babel({
    //     extensions: [".js", ".mjs", ".html", ".svelte"],
    //     runtimeHelpers: true,
    //     exclude: ["node_modules/@babel/**"],
    //     presets: [
    //       [
    //         "@babel/preset-env",
    //         {
    //           targets: "> 0.25%, not dead",
    //         },
    //       ],
    //     ],
    //     plugins: [
    //       "@babel/plugin-syntax-dynamic-import",
    //       [
    //         "@babel/plugin-transform-runtime",
    //         {
    //           useESModules: true,
    //         },
    //       ],
    //     ],
    //   }),
    // ],
};

```

```javascript
   <!-- <script type="module"> -->
    <script type="module">
      let pdf_data = {
        filename: "output.pdf",
        cols: 4,
        header_text: "The header\nText",
        footer_text: "The footer\nText",
        items: [
          {
            image_url:
              "https://image.digitalcollections.manchester.ac.uk/iiif/PR-INCU-18313-000-00001.jp2/full/,150/0/default.jpg",
            image_text: "Line 1\nLine 2\nLine 3",
            width: 6000,
            height: 4500,
          },
          {
            image_url:
              "https://image.digitalcollections.manchester.ac.uk/iiif/PR-INCU-18313-000-00002.jp2/full/,150/0/default.jpg",
            image_text: "Line 1\nLine 2\nLine 3",
            width: 6000,
            height: 4500,
          },
          {
            image_url:
              "https://image.digitalcollections.manchester.ac.uk/iiif/PR-INCU-18313-000-00003.jp2/full/,150/0/default.jpg",
            image_text: "Line 1\nLine 2\nLine 3",
            width: 4500,
            height: 5000,
          },
        ],
      };

      // import the pdf generator
      import { printpage } from "./js/mdc-print.min.js";

      // declare some callbacks (could be done inline)
      function progressCallback(label, progress) {
        console.log(label, progress);
      }
      function completedCallback() {
        console.log("pdf complete");
      }

      // print button event
      document
        .querySelector("#PrintButton")
        .addEventListener("click", () =>
          printpage(pdf_data, progressCallback, completedCallback)
        );
    </script>
```

```bash
./node_modules/.bin/rollup -c
```

Watch for changes

```bash
./node_modules/.bin/rollup -c -w
```
