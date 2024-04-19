import rmbg from "./index.js";
import fs from "node:fs";

;(async function() {
  const input = fs.readFileSync("./test/1.jpg");
  const buffer = await rmbg.exec(input);
  fs.writeFileSync("./test/2.png", buffer);
})();
