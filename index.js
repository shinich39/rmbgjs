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
const MODULE_PATH = path.join(__dirname, "libs", "transparent-background-1.2.12.zip");
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
    MODULE_PATH,
  ]);

  console.log("rmbgjs transparent-background installed.");
}

function run(input, mode) {
  if (!input || !fs.existsSync(input)) {
    throw new Error("Source not found.");
  }
  if (!mode) {
    mode = "fast";
  }
  if (!fs.existsSync(VENV_PATH)) {
    install();
  }

  console.log("rmbgjs mode:", mode);
  console.log("rmbgjs input:", input);

  // create tmp directory
  if (!fs.existsSync(TMP_PATH)) {
    fs.mkdirSync(TMP_PATH);
  }

  // clear tmp directory
  for (const fileName of fs.readdirSync(TMP_PATH)) {
    fs.unlinkSync(path.join(TMP_PATH, fileName));
  }

  // remove background
  execFileSync(EXE_PATH, [
    "--mode",
    mode,
    "--source",
    input,
    "--dest",
    TMP_PATH,
  ]);

  const filePath = path.join(TMP_PATH, path.basename(input, path.extname(input)) + "_rgba.png");

  if (!fs.existsSync(filePath)) {
    throw new Error("rmbgjs occurred error.");
  }

  console.log("rmbgjs completed.");
  
  // to buffer
  return fs.readFileSync(filePath);
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