/**
 * MySleepLabs Critic Engine — Layer 0 automated quality gate (TypeScript port).
 *
 * Ported 1:1 from content/10_CRITIC_SYSTEM/scripts/critic_engine.py so the
 * engine runs inside the Vercel Node runtime (no python3). The Python file
 * remains the canonical source of truth until parity is proven; after the
 * parity gate passes, THIS file is the single source of truth.
 *
 * Negation carve-out is sentence-level (2026-08 audit fix). The previous
 * 30/15-char window was too tight: "definitely not a cure" or "treat your
 * morning like a fresh start" both slipped past the negation check. Sentences
 * are tested as a whole. See runNegationHarness() for the 10-string audit
 * harness — run with `tsx scripts/critic-test.ts --test-negation`.
 *
 * CLI:
 *     tsx scripts/critic-test.ts                # scan all carousels
 *     tsx scripts/critic-test.ts FILE.md        # scan one file
 *     tsx scripts/critic-test.ts --dir ../04_PRODUCT  # scan another dir
 *     tsx scripts/critic-test.ts --json         # also emit JSON report
 *     tsx scripts/critic-test.ts --test-negation # run the 10-string negation harness
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CriticCheck = {
  check: string;
  severity: "PASS" | "FAIL" | "FLAG" | "WARN";
  detail: string;
};

export type CriticVerdict = "PASS" | "REVIEW" | "REWORK";

export type CriticResult = {
  name: string;
  checks: CriticCheck[];
  score: number;
  verdict: CriticVerdict;
};

export type ScanInput = {
  title?: string;
  caption?: string;
  hashtags?: string;
  cta?: string;
  pillar?: string;
  platform?: string;
};

// ---------------------------------------------------------------------------
// Path resolution
// ---------------------------------------------------------------------------

/** Content root: env override, then content mirror, then legacy ../mysleeplabs. */
export function resolveContentRoot(): string {
  const env = process.env.CONTENT_REPO_PATH;
  if (env) {
    const p = path.resolve(process.cwd(), env);
    if (existsSync(path.join(p, "10_CRITIC_SYSTEM"))) return p;
  }
  const mirror = path.join(process.cwd(), "content");
  if (existsSync(path.join(mirror, "10_CRITIC_SYSTEM"))) return mirror;
  return path.resolve(process.cwd(), "..", "mysleeplabs");
}

export function resolveCriticDir(): string {
  return path.join(resolveContentRoot(), "10_CRITIC_SYSTEM");
}

export function resolveCarouselsDir(): string {
  return path.join(resolveContentRoot(), "02_CONTENT", "carousels");
}

export function resolveReportsDir(): string {
  return path.join(resolveCriticDir(), "reports");
}

// ---------------------------------------------------------------------------
// Constants (mirror critic_engine.py exactly)
// ---------------------------------------------------------------------------

const SLIDE_RANGES: Record<string, [number, number]> = {
  Debunk: [9, 12],
  Blueprint: [12, 16],
  Checklist: [10, 14],
  Guide: [10, 16],
};

const REQUIRED_HEADERS = ["Type", "Slides", "Week"] as const;

const DISCLAIMER_RE = /not medical advice/i;
const LIKE_CTA_RE = /\blike\s*(this|and follow|and share)?\s*post\b|\blike\b.*\bpost\b/i;
const CTA_SAVE_RE = /\bsave\b|\bcomment\b|\bDM\b/i;
const CTA_COUNT_RE = /\b(Save|Comment|Tag|DM|Follow|Share|Subscribe)\b/gi;
const SOURCE_CARD_RE = /CARD-\d{3}/i;
const CAPTION_MIN_WORDS = 40;
const CAPTION_MAX_WORDS = 180;

const NEGATION_RE = /\b(not|no|isn'?t|aren'?t|wasn'?t|weren'?t|don'?t|doesn'?t|didn'?t|never)\b/i;
const CONDITION_TERMS_RE =
  /\b(insomnia|sleep\s*apnea|restless\s*leg|anxiety|depression|adhd|melatonin|sleep\s*disorder|mental\s*health|chronic\s*pain)\b/i;

// ---------------------------------------------------------------------------
// Pattern loading (wordlists are REGEX patterns for hard/soft, literal for banned)
// ---------------------------------------------------------------------------

export type CriticPatterns = {
  hard: RegExp[];
  soft: RegExp[];
  banned: string[];
};

// Loader for pattern files. Two file conventions are recognized:
//
//   1. `medical-claims-hard.txt`, `medical-claims-soft.txt` — one regex per
//      line. Lines starting with `#` are comments and dropped; blank lines
//      are dropped. (Heading rows are also denoted with `#`. The first
//      non-blank, non-comment lines after the heading are interpreted as
//      patterns.)
//
//   2. `banned-hashtags.txt` — one literal hashtag per line. The tags
//      THEMSELVES begin with `#`, which would normally trip the comment
//      filter; the same file therefore accepts lines that begin with `!`
//      as a literal-`#` escape. So the convention here is to write:
//        # BANNED HASHTAGS
//        !#follow4follow
//        !#like4like
//        ...
//      The loader strips the leading `!` and re-inserts `#`. If a `#`
//      row appears WITHOUT the `!`, it is still treated as a comment.
//
// This keeps the canonical case (one-regex-per-line, comment-with-#)
// identical to the admin repo's engine while making the banned-hashtag
// file's purpose explicit.

function loadLines(file: string, mode: "regex" | "hashtag" = "regex"): string[] {
  if (!existsSync(file)) return [];
  return readFileSync(file, "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => {
      if (!l) return false;
      if (l.startsWith("#")) return false; // comment
      return true;
    })
    .map((l) =>
      mode === "hashtag" && l.startsWith("!")
        ? l.slice(1).trim()
        : l,
    );
}

export function loadPatterns(criticDir: string): CriticPatterns {
  return {
    hard: loadLines(path.join(criticDir, "medical-claims-hard.txt")).map((p) => new RegExp(p, "gi")),
    soft: loadLines(path.join(criticDir, "medical-claims-soft.txt")).map((p) => new RegExp(p, "gi")),
    banned: loadLines(path.join(criticDir, "banned-hashtags.txt"), "hashtag"),
  };
}

// ---------------------------------------------------------------------------
// Sentence helpers
// ---------------------------------------------------------------------------

/** Return [start, end) of the sentence containing text[pos]. Bounded by [.!?\n]. */
function findSentence(text: string, pos: number): [number, number] {
  let start = 0;
  for (let i = pos - 1; i >= 0; i--) {
    if (".!?\n".includes(text[i])) {
      start = i + 1;
      break;
    }
  }
  let end = text.length;
  for (let i = pos; i < text.length; i++) {
    if (".!?\n".includes(text[i])) {
      end = i + 1;
      break;
    }
  }
  return [start, end];
}

function sentenceText(text: string, pos: number): string {
  const [s, e] = findSentence(text, pos);
  return text.slice(s, e);
}

/** True if the sentence containing this match contains a negation token. */
function isSentenceNegated(text: string, mStart: number): boolean {
  const [s, e] = findSentence(text, mStart);
  const sentence = text.slice(s, e);
  return NEGATION_RE.test(sentence);
}

/**
 * True if 'treat|treats|treating' is used as a non-medical verb ('treat X like Y').
 * Requires: same sentence contains \b(like|as)\b AND no medical-condition term.
 */
function isTreatVerbUsage(text: string, mStart: number): boolean {
  const sentence = sentenceText(text, mStart);
  if (!/\b(like|as)\b/i.test(sentence)) return false;
  if (CONDITION_TERMS_RE.test(sentence)) return false;
  return true;
}

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

type ParsedFile = {
  text: string;
  name: string;
  type: string | null;
  slides: number | null;
  week: string | null;
  hasKeywords: boolean;
  hasCaption: boolean;
  hasCoverPrompt: boolean;
  hasSources: boolean;
  caption: string;
};

export function parseMarkdown(text: string, name: string): ParsedFile {
  const mType = text.match(/\*\*Type:\*\*\s*([^·|]+?)(?:\s*·|\s*\||\s*\n)/);
  const mSlides = text.match(/\*\*Slides:\*\*\s*(\d+)/);
  const mWeek = text.match(/\*\*Week\s+(\d+)/);
  const mKeywords = text.match(/##\s*SEO Keywords\s*\n([\s\S]{1,200})/);
  const mCaption = text.match(/##\s*Caption Draft\s*\n([\s\S]*?)\n\s*##/);
  return {
    text,
    name,
    type: mType ? mType[1].trim() : null,
    slides: mSlides ? parseInt(mSlides[1], 10) : null,
    week: mWeek ? mWeek[1].trim() : null,
    hasKeywords: Boolean(mKeywords),
    hasCaption: Boolean(mCaption),
    hasCoverPrompt: /##\s*Cover Prompt/.test(text),
    hasSources: /##\s*Sources/.test(text),
    caption: mCaption ? mCaption[1] : "",
  };
}

// ---------------------------------------------------------------------------
// The checks
// ---------------------------------------------------------------------------

/** Runs all L0 checks on raw markdown text. Returns {name, checks, score, verdict}. */
export function checkMarkdown(text: string, name: string, patterns: CriticPatterns): CriticResult {
  const p = parseMarkdown(text, name);
  const checks: CriticCheck[] = [];

  const add = (check: string, severity: CriticCheck["severity"], detail = "") => {
    checks.push({ check, severity, detail });
  };

  if (!/^carousel-\d{2}-/.test(p.name)) {
    add("File naming", "FAIL", "must be carousel-NN-<slug>.md");
  }

  if (!p.type) add("Header: Type", "FAIL");
  if (p.slides === null) add("Header: Slides", "FAIL");
  if (!p.week) add("Header: Week", "FAIL");

  if (p.type && p.slides !== null) {
    const [lo, hi] = SLIDE_RANGES[p.type] ?? [8, 18];
    if (!(lo <= p.slides && p.slides <= hi)) {
      add("Slide count", "FAIL", `${p.slides} slides; ${p.type} allows ${lo}-${hi}`);
    }
  } else {
    add("Slide count", "PASS", `${p.slides ?? "None"} within ${p.type ?? "None"} range`);
  }

  for (const pat of patterns.hard) {
    for (const m of p.text.matchAll(pat)) {
      if (isSentenceNegated(p.text, m.index!)) continue; // "not a diagnosis", "definitely not a cure"
      if (isTreatVerbUsage(p.text, m.index!)) continue; // "treat 6 AM like 10 PM" — verb usage
      const ctx = p.text.slice(Math.max(0, m.index! - 40), m.index! + m[0].length + 40).replace(/\n/g, " ");
      add("Hard medical claim", "FAIL", `'${m[0]}' … ${ctx}`);
      break;
    }
  }

  if (!DISCLAIMER_RE.test(p.text)) {
    add("Disclaimer", "FAIL", "'not medical advice' missing");
  } else {
    add("Disclaimer", "PASS");
  }

  for (const pat of patterns.soft) {
    for (const m of p.text.matchAll(pat)) {
      const ctx = p.text.slice(Math.max(0, m.index! - 40), m.index! + m[0].length + 40).replace(/\n/g, " ");
      add("Soft flag (L2 review)", "FLAG", `'${m[0]}' … ${ctx}`);
      break;
    }
  }

  for (const tag of patterns.banned) {
    if (p.text.toLowerCase().includes(tag.toLowerCase())) {
      add("Banned hashtag", "FAIL", tag);
    }
  }

  const captionBlock = p.caption;
  if (LIKE_CTA_RE.test(captionBlock)) {
    add("CTA quality", "FLAG", "'like this post' style CTA — replace with save/comment/DM");
  } else if (CTA_SAVE_RE.test(captionBlock)) {
    add("CTA quality", "PASS");
  } else {
    add("CTA quality", "FAIL", "no save/comment/DM CTA found");
  }

  if (!p.hasKeywords) {
    add("SEO keywords", "FAIL", "## SEO Keywords section missing");
  } else {
    add("SEO keywords", "PASS");
  }

  if (!p.hasCaption) {
    add("Caption draft", "FAIL");
  } else {
    const trimmed = p.caption.trim();
    const wc = trimmed ? trimmed.split(/\s+/).length : 0;
    if (wc < CAPTION_MIN_WORDS || wc > CAPTION_MAX_WORDS) {
      add("Caption length", "FLAG", `${wc} words (target ${CAPTION_MIN_WORDS}-${CAPTION_MAX_WORDS})`);
    } else {
      add("Caption length", "PASS", `${wc} words`);
    }
  }

  const ctas = Array.from(new Set([...p.caption.matchAll(CTA_COUNT_RE)].map((m) => m[1].toLowerCase()))).sort();
  const primary = ctas.filter((c) => c !== "save");
  if (primary.length > 1) {
    add("CTA count", "FLAG", `${primary.length} primary CTAs (${primary.join(", ")}) — one primary + save only`);
  } else {
    add("CTA count", "PASS", `${ctas.join(", ") || "none"}`);
  }

  if (!p.hasSources) {
    add("Sources section", "FAIL", "## Sources section missing — every claim needs a source card (source-cards.md)");
  } else if (!SOURCE_CARD_RE.test(p.text)) {
    add("Sources section", "FAIL", "## Sources present but no CARD-### links found");
  } else {
    add("Sources section", "PASS");
  }

  if (!p.hasCoverPrompt) {
    add("Cover prompt", "FLAG", "## Cover Prompt section missing");
  }

  if (p.text.toLowerCase().includes("affiliate")) {
    if (/#ad\b|#sponsored\b|affiliate/i.test(p.text)) {
      add("Affiliate disclosure", "PASS");
    } else {
      add("Affiliate disclosure", "FLAG", "content references affiliate; add #ad disclosure");
    }
  } else {
    add("Affiliate disclosure", "PASS", "n/a (not affiliate content)");
  }

  if (p.text.includes("<!-- ai-label: on -->")) {
    add("AI label", "PASS", "<!-- ai-label: on --> marker present — apply AI info label + profile AI creator tag at upload");
  } else {
    add("AI label", "FAIL", "missing <!-- ai-label: on --> marker — required since Apr 30 2026 (Meta mandate)");
  }

  const nFail = checks.filter((c) => c.severity === "FAIL").length;
  const nFlag = checks.filter((c) => c.severity === "FLAG").length;
  const nWarn = checks.filter((c) => c.severity === "WARN").length;
  const score = Math.max(0, 100 - 15 * nFail - 5 * nFlag - 2 * nWarn);

  let verdict: CriticVerdict;
  if (nFail) {
    verdict = "REWORK";
  } else if (score >= 80) {
    verdict = "PASS";
  } else if (score >= 60) {
    verdict = "REVIEW";
  } else {
    verdict = "REWORK";
  }

  return { name: p.name, checks, score, verdict };
}

// ---------------------------------------------------------------------------
// File/dir scanning
// ---------------------------------------------------------------------------

/** Python path.stem: basename with the last suffix removed. */
function stem(file: string): string {
  return path.basename(file).replace(/\.[^.]+$/, "");
}

export function scanFile(file: string, patterns: CriticPatterns): CriticResult {
  return checkMarkdown(readFileSync(file, "utf8"), stem(file), patterns);
}

export function scanDirectory(dir: string, patterns: CriticPatterns): CriticResult[] {
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(dir, f))
    .sort();
  return files.map((f) => scanFile(f, patterns));
}

// ---------------------------------------------------------------------------
// Report writing (byte-parity with Python json.dumps(..., indent=2), ensure_ascii=True)
// ---------------------------------------------------------------------------

function pyJsonDumps(value: unknown): string {
  // Python's json.dumps escapes all non-ASCII as \uXXXX by default; JSON.stringify doesn't.
  return JSON.stringify(value, null, 2).replace(/[\u007f-\uffff]/g, (c) => {
    return `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`;
  });
}

export function writeCriticReport(results: CriticResult[], reportsDir: string): string {
  mkdirSync(reportsDir, { recursive: true });
  const now = new Date();
  const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const out = path.join(reportsDir, `critic_report_${iso}.json`);
  writeFileSync(out, pyJsonDumps(results));
  return out;
}

// ---------------------------------------------------------------------------
// buildScanMarkdown — the input contract for the /api/posts critic scan
// ---------------------------------------------------------------------------

export function buildScanMarkdown(input: ScanInput): string {
  const lines: string[] = [];
  if (input.title) {
    lines.push(`# ${input.title}`);
    lines.push("");
  }
  const typeRaw = (input.pillar || "blueprint").trim();
  const typeMap: Record<string, string> = {
    debunk: "Debunk",
    blueprint: "Blueprint",
    checklist: "Checklist",
    reel: "Guide",
    broadcast: "Blueprint",
    pin: "Guide",
  };
  const type = typeMap[typeRaw.toLowerCase()] || "Blueprint";
  const slides = type === "Blueprint" || type === "Guide" ? 14 : 10;
  const week = 1;
  lines.push(`**Type:** ${type} · **Slides:** ${slides} · **Week ${week} · Mon**`);
  lines.push("");
  if (input.caption) {
    lines.push("## Caption Draft");
    lines.push("");
    lines.push(`\`${input.caption}${input.cta ? ` ${input.cta}` : ""}\``);
    lines.push("");
  }
  if (input.hashtags) {
    lines.push("## Hashtags");
    lines.push("");
    lines.push(input.hashtags);
    lines.push("");
  }
  lines.push("## Slide-by-Slide");
  lines.push("");
  if (input.cta) {
    lines.push(`10. **CTA slide:** ${input.cta} _Educational, not medical advice._`);
    lines.push("");
  }
  lines.push("## SEO Keywords");
  lines.push("");
  lines.push("sleep hygiene · evidence based · better rest");
  lines.push("");
  lines.push("## Cover Prompt (Ideogram)");
  lines.push("");
  lines.push("`Isometric 3D bedroom at night, dark navy palette, cozy moonlit window, bold amber text, minimalist, high detail`");
  lines.push("");
  lines.push("## Sources");
  lines.push("");
  lines.push("CARD-001: AASM/SRS consensus 2015");
  lines.push("");
  lines.push("<!-- ai-label: on -->");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Negation audit harness (mirror _test_negation_carveouts)
// ---------------------------------------------------------------------------

export function runNegationHarness(patterns: CriticPatterns): number {
  const tests: Array<[string, boolean]> = [
    ["Cures insomnia in 7 days", true],
    ["treat 6 AM like 10 PM", false],
    ["This is not a diagnosis", false],
    ["scientifically proven to help you sleep", true],
    ["100% effective", true],
    ["clinically tested sleep technique", true],
    ["permanently fixes your insomnia", true],
    ["guaranteed to work", true],
    ["This is definitely not a cure", false],
    ["treat your morning like a fresh start", false],
  ];
  let fails = 0;
  for (const [caption, expectFail] of tests) {
    const text = `## Caption Draft\n\`${caption}\`\n\n## Sources\nCARD-001\n## SEO Keywords\nsleep\n`;
    let detected = false;
    outer: for (const pat of patterns.hard) {
      for (const m of text.matchAll(pat)) {
        if (isSentenceNegated(text, m.index!)) continue;
        if (isTreatVerbUsage(text, m.index!)) continue;
        detected = true;
        break outer;
      }
    }
    const ok = detected === expectFail;
    const verdict = ok ? "PASS" : "FAIL";
    const marker = ok ? "✓" : "✗";
    // Python f-string bools render as True/False — mirror for byte parity.
    console.log(
      `${marker} ${verdict} | detected=${detected ? "True" : "False"} expected=${expectFail ? "True" : "False"} | '${caption}'`,
    );
    if (!ok) fails++;
  }
  console.log(`\n${"-".repeat(70)}\n${fails === 0 ? "ALL PASS" : `${fails} FAILED`} (${tests.length - fails}/${tests.length})`);
  return fails === 0 ? 0 : 1;
}
