import { spawn } from "node:child_process";

const target = process.env.LH_URL || "http://127.0.0.1:1313/";

const args = [
  target,
  "--quiet",
  "--chrome-flags=--headless",
  "--only-categories=performance,accessibility,best-practices,seo",
  "--output=html",
  "--output-path=./lighthouse-report.html",
];

const proc = spawn("npx", ["lighthouse", ...args], { stdio: "inherit" });
proc.on("exit", (code) => process.exit(code ?? 1));
