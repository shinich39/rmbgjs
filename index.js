'use strict';

import path from "node:path";
import fs from "node:fs";
import { spawn, spawnSync, execSync, execFileSync } from "node:child_process";
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const VENV_PATH = path.join(__dirname, "venv");
const SCRIPTS_PATH = path.join(__dirname, "venv", "Scripts");
const ACTIVATE_PATH = path.join(__dirname, "venv", "Scripts", "activate.bat");
const DEACTIVAATE_APTH = path.join(__dirname, "venv", "Scripts", "deactivate.bat");
const PIP_PATH = path.join(__dirname, "venv", "Scripts", "pip.exe");
const EXE_PATH = path.join(__dirname, "venv", "Scripts", "transparent-background.exe");
const TMP_PATH = path.join(__dirname, "tmp");

function install() {
  if (fs.existsSync(VENV_PATH)) {
    console.log("rmbgjs venv already created.");
    return;
  }

  spawnSync("python", [
    "-m",
    "venv",
    VENV_PATH,
  ]);

  console.log("rmbgjs venv created.");

  if (fs.existsSync(EXE_PATH)) {
    console.log("rmbgjs transparent-background already installed.");
    return;
  }
  
  execFileSync(PIP_PATH, [
    "install",
    "./libs/transparent-background-1.2.12.zip"
  ]);

  console.log("rmbgjs transparent-background installed.");
}

function rename(oldPath, newPath) {
  if (fs.existsSync(newPath)) {
    fs.unlinkSync(newPath);
  }
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
  }
}

function run(mode, input, output, overwrite) {
  if (!input || !fs.existsSync(input)) {
    throw new Error("Source not found.");
  }
  if (!output) {
    output = path.join(path.dirname(input), "output");
    if (!fs.existsSync(output)) {
      fs.mkdirSync(output);
    }
  }
  if (!mode) {
    mode = "fast";
  }
  if (!overwrite) {
    overwrite = false;
  }
  if (!fs.existsSync(VENV_PATH)) {
    install();
  }
  if (!overwrite && fs.existsSync(output)) {
    throw new Error("Output already exists.");
  }

  console.log("rmbgjs mode:", mode);
  console.log("rmbgjs input:", input);
  console.log("rmbgjs output:", output);

  if (!fs.existsSync(TMP_PATH)) {
    fs.mkdirSync(TMP_PATH);
  }

  execFileSync(EXE_PATH, [
    "--mode",
    mode,
    "--source",
    input,
    "--dest",
    TMP_PATH,
  ]);

  const oldPath = path.join(TMP_PATH, path.basename(input, path.extname(input)) + "_rgba.png");
  const newPath = output;
  
  rename(oldPath, newPath);

  console.log("rmbgjs completed:", newPath);
}

// esm
export default {
  exec: run,
}

// cjs
// module.exports = {
//   sum: sum,
//   test: test,
// }

// browser
// if (window.myModule === undefined) {
//   window.myModule = {
//     sum: sum,
//     test: test,
//   };
// }