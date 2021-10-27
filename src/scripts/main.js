// Import a couple modules for testing.
// import { sayHelloTo } from "./modules/mod1";
// import addArray from "./modules/mod2";

// Run some functions from our imported modules.
// const result1 = sayHelloTo("Jason");
// const result2 = addArray([1, 2, 3, 4]);

// // Print the results on the page.
// const printTarget = document.getElementsByClassName("debug__output")[0];

// printTarget.innerText = `sayHelloTo('Jason') => ${result1}\n\n`;
// printTarget.innerText += `addArray([1, 2, 3, 4]) => ${result2}`;

import jsPDF from "jspdf";

export const printButtonClicked = () => {
  console.log("Clicked");
  var doc = new jsPDF();

  doc.setFontSize(40);
  doc.text("Octonyan loves jsPDF", 35, 25);
  doc.addImage(
    "https://image.digitalcollections.manchester.ac.uk/iiif/VS-VPH-00005-00001-000-00001.jp2/full/,600/0/default.jpg",
    "JPEG",
    35,
    55,
    120,
    81
  );
  doc.save("woohoo.pdf");
};

console.log("loaded");
