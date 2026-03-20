#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

function readStdin() {
  return new Promise((resolve) => {
    let input = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      input += chunk;
    });
    process.stdin.on('end', () => resolve(input));
    process.stdin.resume();
  });
}

function outputContinue() {
  process.stdout.write(JSON.stringify({ continue: true }));
}

function outputBlock(reason) {
  process.stdout.write(
    JSON.stringify({
      decision: 'block',
      reason,
      continue: false,
      hookSpecificOutput: {
        hookEventName: 'PostToolUse',
        decision: 'block',
        reason,
      },
    })
  );
}

function normalizeFilePath(filePath) {
  if (!filePath || typeof filePath !== 'string') return null;
  if (filePath.startsWith('file://')) return null;

  const cleaned = filePath.replace(/^['\"]|['\"]$/g, '');
  if (!cleaned) return null;

  if (path.isAbsolute(cleaned)) return path.normalize(cleaned);
  return path.normalize(path.join(process.cwd(), cleaned));
}

function collectPathsFromPatchInput(patchText) {
  const paths = [];
  const regex = /^\*\*\*\s+(?:Add|Update|Delete) File:\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(patchText)) !== null) {
    const candidate = match[1].trim();
    const normalized = normalizeFilePath(candidate);
    if (normalized) paths.push(normalized);
  }
  return paths;
}

function collectTouchedFilesFromPayload(payload) {
  const touched = new Set();

  function visit(value, keyHint) {
    if (value == null) return;

    if (typeof value === 'string') {
      if (keyHint && /^(filePath|path|old_path|new_path)$/i.test(keyHint)) {
        const normalized = normalizeFilePath(value);
        if (normalized) touched.add(normalized);
      }

      if (keyHint === 'input' && value.includes('***')) {
        collectPathsFromPatchInput(value).forEach((p) => touched.add(p));
      }
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((entry) => visit(entry, keyHint));
      return;
    }

    if (typeof value === 'object') {
      Object.keys(value).forEach((k) => visit(value[k], k));
    }
  }

  visit(payload, '');
  return Array.from(touched);
}

function fileIsRelevant(filePath) {
  const rel = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
  if (rel.startsWith('..')) return false;
  if (!fs.existsSync(filePath)) return false;

  const isContentFile =
    rel.startsWith('src/') || rel === 'BUSINESS_REFERENCE.md' || rel.endsWith('.md');
  const hasTextExtension = /\.(tsx?|astro|md|json|txt|html|css)$/i.test(rel);

  return isContentFile && hasTextExtension;
}

function getCanonicalFacts() {
  const referencePath = path.join(process.cwd(), 'BUSINESS_REFERENCE.md');
  const fallback = {
    phone: '9756544613',
    intlPhone: '+91-9756544613',
    email: 'adiwarsi953@gmail.com',
    locationTokens: ['Nainital', 'Uttarakhand', 'India'],
  };

  if (!fs.existsSync(referencePath)) return fallback;

  const text = fs.readFileSync(referencePath, 'utf8');
  const phoneMatch = text.match(/-\s*Phone:\s*([^\r\n]+)/i);
  const intlMatch = text.match(/-\s*International phone format[^:]*:\s*([^\r\n]+)/i);
  const emailMatch = text.match(/-\s*Email:\s*([^\r\n]+)/i);

  return {
    phone: phoneMatch ? phoneMatch[1].trim() : fallback.phone,
    intlPhone: intlMatch ? intlMatch[1].trim() : fallback.intlPhone,
    email: emailMatch ? emailMatch[1].trim() : fallback.email,
    locationTokens: fallback.locationTokens,
  };
}

function getAddedLines(filePath) {
  const rel = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
  const cmd = `git diff --no-color -U0 -- "${rel}"`;
  const diff = cp.execSync(cmd, { encoding: 'utf8' });

  return diff
    .split(/\r?\n/)
    .filter((line) => line.startsWith('+') && !line.startsWith('+++'));
}

function normalizePhone(value) {
  return value.replace(/[^\d+]/g, '');
}

function lineHasContactContext(line) {
  return /(phone|call|tel:|whatsapp|contact)/i.test(line);
}

function lineHasLocationContext(line) {
  return /(location|address|map|nainital|uttarakhand|india)/i.test(line);
}

function checkLineViolations(line, facts) {
  const violations = [];

  const emailMatches = line.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [];
  emailMatches.forEach((email) => {
    if (email.toLowerCase() !== facts.email.toLowerCase()) {
      violations.push(`email mismatch: found ${email}, expected ${facts.email}`);
    }
  });

  const phoneMatches = line.match(/\+?[0-9][0-9\-\s]{8,}[0-9]/g) || [];
  const normalizedAllowed = new Set([
    normalizePhone(facts.phone),
    normalizePhone(facts.intlPhone),
  ]);

  phoneMatches.forEach((phone) => {
    const normalized = normalizePhone(phone);
    if (lineHasContactContext(line) && !normalizedAllowed.has(normalized)) {
      violations.push(`phone mismatch: found ${phone}, expected ${facts.phone}`);
    }
  });

  if (lineHasLocationContext(line)) {
    const hasKnownLocation = facts.locationTokens.some((token) =>
      line.toLowerCase().includes(token.toLowerCase())
    );

    const hasDifferentCity = /\b(delhi|mumbai|pune|bangalore|chennai|hyderabad|kolkata)\b/i.test(
      line
    );

    if (hasDifferentCity && !hasKnownLocation) {
      violations.push(
        'location mismatch: added location text may conflict with BUSINESS_REFERENCE.md (Nainital, Uttarakhand, India)'
      );
    }
  }

  return violations;
}

async function main() {
  try {
    const stdin = await readStdin();
    const payload = stdin.trim() ? JSON.parse(stdin) : {};

    const touchedFiles = collectTouchedFilesFromPayload(payload).filter(fileIsRelevant);
    if (touchedFiles.length === 0) {
      outputContinue();
      return;
    }

    const facts = getCanonicalFacts();
    const violations = [];

    touchedFiles.forEach((filePath) => {
      let addedLines = [];
      try {
        addedLines = getAddedLines(filePath);
      } catch (_err) {
        return;
      }

      addedLines.forEach((line) => {
        const lineViolations = checkLineViolations(line, facts);
        lineViolations.forEach((v) => {
          violations.push(`${path.relative(process.cwd(), filePath)}: ${v}`);
        });
      });
    });

    if (violations.length > 0) {
      outputBlock(
        `Business content consistency check failed. ${violations.slice(0, 4).join(' | ')}`
      );
      process.exit(2);
      return;
    }

    outputContinue();
  } catch (err) {
    process.stdout.write(
      JSON.stringify({
        continue: true,
        systemMessage: `content-consistency hook warning: ${err && err.message ? err.message : 'unknown error'}`,
      })
    );
  }
}

main();
