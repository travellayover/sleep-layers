#!/usr/bin/env tsx
/**
 * Critic CLI — byte-parity mirror of content/10_CRITIC_SYSTEM/scripts/critic_engine.py main().
 *
 * Usage:
 *     tsx scripts/critic-test.ts                 # scan all carousels
 *     tsx scripts/critic-test.ts FILE.md         # scan one file
 *     tsx scripts/critic-test.ts --json          # also emit JSON report
 *     tsx scripts/critic-test.ts --test-negation # run the 10-string negation harness
 *
 * Exit: 0 all PASS/REVIEW, 1 if any REWORK, 2 if no files found.
 * Note: python's "--dir" help text is stale — targets are positional (file OR dir).
 */

import { exit } from "node:process";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import {
  loadPatterns,
  resolveCarouselsDir,
  resolveCriticDir,
  resolveReportsDir,
  runNegationHarness,
  scanFile,
  writeCriticReport,
} from "../lib/critic/engine";

const argv = process.argv.slice(2);

// --test-negation must be the first argument, like python's `sys.argv[1]`.
if (argv[0] === "--test-negation") {
  exit(runNegationHarness(loadPatterns(resolveCriticDir())));
}

const withJson = argv.includes("--json");
const targets = argv.filter((a) => a !== "--json");

const carouselsDir = resolveCarouselsDir();

const files: string[] = [];
if (targets.length) {
  for (const t of targets) {
    const tp = path.resolve(process.cwd(), t);
    if (existsSync(tp) && statSync(tp).isDirectory()) {
      files.push(...readdirSync(tp).filter((f) => f.endsWith(".md")).map((f) => path.join(tp, f)).sort());
    } else {
      files.push(tp);
    }
  }
} else {
  files.push(...readdirSync(carouselsDir).filter((f) => f.endsWith(".md")).map((f) => path.join(carouselsDir, f)).sort());
}

if (!files.length) {
  // Python prints DEFAULT_DIR here even when targets were given — mirrored.
  console.log(`no files in ${carouselsDir}`);
  exit(2);
}

const patterns = loadPatterns(resolveCriticDir());
const results = files.map((f) => scanFile(f, patterns));

// Print: score desc, stable (ties keep path order) — fails before notes.
for (const r of [...results].sort((a, b) => b.score - a.score)) {
  const fails = r.checks.filter((c) => c.severity === "FAIL");
  const notes = r.checks.filter((c) => c.severity === "FLAG" || c.severity === "WARN");
  console.log(`\n${"=".repeat(70)}\n${r.name}  →  ${r.verdict}  (score ${r.score})`);
  for (const c of fails) console.log(`  [FAIL] ${c.check}: ${c.detail}`);
  for (const c of notes) console.log(`  [note] ${c.check}: ${c.detail}`);
}

const nRework = results.filter((r) => r.verdict === "REWORK").length;
const nReview = results.filter((r) => r.verdict === "REVIEW").length;
const nPass = results.filter((r) => r.verdict === "PASS").length;

console.log(`\n${"=".repeat(70)}\nSUMMARY: ${results.length} files — PASS ${nPass} · REVIEW ${nReview} · REWORK ${nRework}`);
console.log("RULE: nothing ships with REWORK. Fix → re-run → only then post.");

if (withJson) {
  const out = writeCriticReport(results, resolveReportsDir());
  console.log(`report written: ${out}`);
}

if (nRework) exit(1);
