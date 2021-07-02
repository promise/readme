const fs = require("fs");

const age = 1075762800000;
const yearInMs = 3.1556926e10;

fs.readFile("./README_template.md", "utf8", (err, template) => {
  if (err) throw err;
  fs.writeFile("./README.md", template
    .replace(/{{AGE}}/g, `\`${Math.floor((Date.now() - age) / yearInMs * 1e4) / 1e4}\``)
  , "utf8", () => console.log("done"))
})