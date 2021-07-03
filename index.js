const fs = require("fs"), fetch = require("node-fetch");

const age = 1075762800000;
const yearInMs = 3.1556926e10;

fs.readFile("./README_template.md", "utf8", async (err, template) => {
  if (err) throw err;

  const countr = await fetch("https://countr-splash-stats.promise.workers.dev/").then(res => res.json()).catch(() => ({ server_count: "?", server_count_rank: "?", count: "?" }));
  const inspirobot = await fetch("https://inspirobot.me/api?generate=true").then(res => res.text()).catch(() => "");

  fs.writeFile("./README.md", template
    .replace(/{{AGE}}/g, `\`${Math.floor((Date.now() - age) / yearInMs * 1e4) / 1e4}\``)

    .replace(/{{COUNTR-SERVERS}}/g, countr.server_count.toLocaleString("en-US"))
    .replace(/{{COUNTR-RANKING}}/g, countr.server_count_rank.toLocaleString("en-US"))
    .replace(/{{COUNTR-COUNTS}}/g, countr.count.toLocaleString("en-US"))

    .replace(/{{INSPIROBOT}}/g, inspirobot)

  , "utf8", () => console.log("done"))
})