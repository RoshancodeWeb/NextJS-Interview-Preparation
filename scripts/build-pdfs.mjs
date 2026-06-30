#!/usr/bin/env node
// Build PDFs from every Markdown guide in the repo.
//
// For each `GUIDE.md` (and every file under `guides/`), this renders a
// colocated `.pdf` next to it: Markdown -> HTML (via `marked`) -> PDF (via the
// system `wkhtmltopdf` binary). The shared stylesheet in
// `guides/assets/style.css` is inlined into each page so no local-file access
// is required.
//
// Run it with:  npm run build:pdfs   (from the nextjs-structure-lab folder)
// or directly:  node scripts/build-pdfs.mjs

import { marked } from 'marked';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const cssPath = path.join(repoRoot, 'guides', 'assets', 'style.css');
const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';

const IGNORE_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build']);

marked.setOptions({ gfm: true, breaks: false });

/** Recursively collect Markdown files we want to turn into PDFs. */
function collectMarkdown(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      collectMarkdown(path.join(dir, entry.name), out);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // Build a PDF for GUIDE.md files and anything living under guides/.
      const full = path.join(dir, entry.name);
      const isGuide = entry.name === 'GUIDE.md';
      const inGuidesDir = full.startsWith(path.join(repoRoot, 'guides') + path.sep);
      if (isGuide || inGuidesDir) out.push(full);
    }
  }
  return out;
}

/** Wrap rendered HTML body in a full document with the shared stylesheet inlined. */
function htmlDocument(title, bodyHtml) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<style>${css}</style>
</head>
<body>
<main class="guide">
${bodyHtml}
</main>
</body>
</html>`;
}

function checkWkhtmltopdf() {
  try {
    execFileSync('wkhtmltopdf', ['--version'], { stdio: 'ignore' });
  } catch {
    console.error(
      '\n[build-pdfs] `wkhtmltopdf` not found on PATH.\n' +
        'Install it (macOS: `brew install --cask wkhtmltopdf`) and re-run.\n'
    );
    process.exit(1);
  }
}

function build() {
  checkWkhtmltopdf();
  const files = collectMarkdown(repoRoot);
  if (files.length === 0) {
    console.log('[build-pdfs] No Markdown guides found.');
    return;
  }
  console.log(`[build-pdfs] Rendering ${files.length} guide(s) to PDF...\n`);

  for (const mdPath of files) {
    const dir = path.dirname(mdPath);
    const base = path.basename(mdPath, '.md');
    const title = base === 'GUIDE' ? path.basename(dir) : base;
    const md = fs.readFileSync(mdPath, 'utf8');
    const bodyHtml = marked.parse(md);
    const html = htmlDocument(title, bodyHtml);

    const tmpHtml = path.join(dir, `.${base}.tmp.html`);
    const pdfPath = path.join(dir, `${base}.pdf`);
    fs.writeFileSync(tmpHtml, html, 'utf8');

    try {
      execFileSync(
        'wkhtmltopdf',
        [
          '--quiet',
          '--encoding', 'utf-8',
          '--enable-local-file-access',
          '-s', 'A4',
          '--margin-top', '18mm',
          '--margin-bottom', '18mm',
          '--margin-left', '16mm',
          '--margin-right', '16mm',
          tmpHtml,
          pdfPath,
        ],
        { stdio: 'ignore' }
      );
      console.log(`  ✓ ${path.relative(repoRoot, pdfPath)}`);
    } catch (err) {
      console.error(`  ✗ Failed: ${path.relative(repoRoot, mdPath)} -> ${err.message}`);
    } finally {
      fs.rmSync(tmpHtml, { force: true });
    }
  }
  console.log('\n[build-pdfs] Done.');
}

build();
