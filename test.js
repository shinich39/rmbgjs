import rmbg from "./index.js";
import fs from "node:fs";

const buffer = rmbg.exec("./test/1.jpg");
fs.writeFileSync("./test/3.png", buffer);
console.log(buffer);