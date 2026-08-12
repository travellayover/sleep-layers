#!/usr/bin/env bash
# Local CI for the Sleep Layers consumer site.
# Mirrors `.github/workflows/ci.yml`. Run on any dev machine:
#
#   bash scripts/ci.sh
#
# Gates:
#   1. Typecheck   — `npx tsc --noEmit` exits 0
#   2. L0 negation harness — `npx tsx scripts/critic-test.ts --test-negation` prints "ALL PASS"
#   3. Production build — `npm run build` completes, ≥ 27 distinct routes prerendered
#
# Any failing gate exits non-zero so this script can be wired into CI,
# pre-push hooks, or just `bash scripts/ci.sh` from a fresh checkout.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Coloured output when stdout is a terminal.
if [ -t 1 ]; then
  C_OK=$'\e[32m'; C_FAIL=$'\e[31m'; C_INFO=$'\e[36m'; C_RESET=$'\e[0m'
else
  C_OK=""; C_FAIL=""; C_INFO=""; C_RESET=""
fi

PASS=0
FAIL=0
say_pass() { echo "  ${C_OK}✓${C_RESET} $1"; PASS=$((PASS+1)); }
say_fail() { echo "  ${C_FAIL}✗${C_RESET} $1"; FAIL=$((FAIL+1)); }
say_info() { echo "${C_INFO}▸${C_RESET} $1"; }

echo
echo "${C_INFO}▸ Sleep Layers consumer-site CI${C_RESET}"
echo "${C_INFO}▸ repo: ${ROOT}${C_RESET}"

# 0. Tooling check
echo
say_info "tooling"
if ! command -v node >/dev/null 2>&1; then
  say_fail "node is not on PATH"
  exit 1
fi
say_pass "node $(node --version)"
if ! command -v npm >/dev/null 2>&1; then
  say_fail "npm is not on PATH"
  exit 1
fi
say_pass "npm $(npm --version)"

# 0b. node_modules
if [ ! -d node_modules ]; then
  echo
  say_info "installing dependencies (first run)"
  npm ci --no-audit --no-fund
fi
say_pass "node_modules present"

# Pin the critic pattern root to this repo's content/ tree so the L0
# harness loads the right patterns regardless of where CI runs.
# (Locally the engine falls back to /Users/gm/mysleeplabs/, but on
# CI runners that path does not exist.)
export CONTENT_REPO_PATH="$ROOT/content"

# Gate 1 — typecheck
echo
say_info "gate 1/3 — typecheck"
if npx tsc --noEmit; then
  say_pass "tsc --noEmit"
else
  say_fail "tsc --noEmit"
fi

# Gate 2 — L0 negation harness (uses local tsx)
echo
say_info "gate 2/3 — L0 negation harness"
if ./node_modules/.bin/tsx scripts/critic-test.ts --test-negation > /tmp/sleep-layers-ci-l0.log 2>&1; then
  say_pass "L0 negation harness ($(grep -c '✓ PASS' /tmp/sleep-layers-ci-l0.log)/10)"
else
  say_fail "L0 negation harness"
  cat /tmp/sleep-layers-ci-l0.log
fi

# Gate 3 — production build
echo
say_info "gate 3/3 — production build"
TMP_NEXT="$(mktemp -d)"
if NEXT_OUTPUT="$ROOT/.next" HOME="$TMP_NEXT" npm run build >/tmp/sleep-layers-ci.log 2>&1; then
  say_pass "npm run build"
  # Count distinct static routes from the build summary table.
  # Each route appears as a "├ /..." or "└ /..." line.
  route_count=$(grep -cE '^[[:space:]]*[├└][[:space:]]+/' /tmp/sleep-layers-ci.log || true)
  # Also get the "Generating static pages (NN/NN)" final number.
  page_count=$(grep -oE 'Generating static pages \([0-9]+/[0-9]+\)' /tmp/sleep-layers-ci.log | tail -1 | grep -oE '[0-9]+' | tail -1)
  page_count="${page_count:-0}"
  route_count="${route_count:-0}"
  if [ "$route_count" -ge 27 ] || [ "$page_count" -ge 27 ]; then
    say_pass "static routes: ${route_count} · prerendered static pages: ${page_count} (≥ 27 expected for full consumer surface)"
  else
    say_fail "static routes ${route_count}, prerendered pages ${page_count}; expected ≥ 27"
  fi
else
  say_fail "npm run build (see /tmp/sleep-layers-ci.log)"
fi
rm -rf "$TMP_NEXT"

# Summary
echo
echo "${C_INFO}▸ summary${C_RESET}"
echo "  passed: $PASS"
echo "  failed: $FAIL"
echo

if [ "$FAIL" -gt 0 ]; then
  echo "${C_FAIL}CI FAILED${C_RESET}"
  exit 1
fi
echo "${C_OK}CI PASSED${C_RESET}"
exit 0
