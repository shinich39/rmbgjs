import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from 'node:url';
import rmbg from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const INPUT_PATH = path.join(__dirname, "input");
const OUTPUT_PATH = path.join(__dirname, "output");

;(async function() {
  if (!fs.existsSync(INPUT_PATH)) {
    fs.mkdirSync(INPUT_PATH);
  }
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH);
  }

  // guide file
  if (!fs.existsSync(path.join(INPUT_PATH, "PUT_IMAGE_FILES_HERE"))) {
    fs.writeFileSync(path.join(INPUT_PATH, "PUT_IMAGE_FILES_HERE"), "", { encoding: "utf8" });
  }

  let startedAt = Date.now();
  let count = 0;
  for (const file of fs.readdirSync(INPUT_PATH)) {
    if ([".jpg", ".jpeg", ".png", ].indexOf(path.extname(file)) === -1) {
      continue;
    }

    try {
      const srcPath = path.join(INPUT_PATH, file);
      const dstPath = path.join(OUTPUT_PATH, path.basename(file, path.extname(file))+".png");

      const input = fs.readFileSync(srcPath);
      const output = await rmbg.exec(input);
      
      fs.writeFileSync(dstPath, output);

      count++;
    } catch(err) {
      console.error(err);
    }
  }

  console.log(`> Complete processing ${count} files in ${Math.floor(Date.now() - startedAt) / 1000} seconds.`);
})();
