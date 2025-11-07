const fs = require('fs/promises');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const STATIC_DIRS = ['assets', 'docs', 'demo'];

async function ensureCleanDist() {
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(DIST, { recursive: true });
}

async function copyStatic() {
  for (const dir of STATIC_DIRS) {
    const src = path.join(ROOT, dir);
    const dest = path.join(DIST, dir);
    try {
      await fs.cp(src, dest, { recursive: true });
    } catch (error) {
      if (error.code === 'ENOENT') continue;
      throw error;
    }
  }
}

async function inlineIncludes(filePath) {
  let content = await fs.readFile(filePath, 'utf8');
  const includeRegex = /<!--#include\s+file="([^"]+)"\s+-->/g;
  const matches = [...content.matchAll(includeRegex)];

  for (const match of matches) {
    const includeRelative = match[1];
    const includePath = path.resolve(path.dirname(filePath), includeRelative);
    const includeContent = await inlineIncludes(includePath);
    content = content.replace(match[0], includeContent);
  }

  return content;
}

async function writeHtmlFile(srcPath) {
  const relativePath = path.relative(ROOT, srcPath);
  const destinationPath = path.join(DIST, relativePath);
  await fs.mkdir(path.dirname(destinationPath), { recursive: true });
  const content = await inlineIncludes(srcPath);
  await fs.writeFile(destinationPath, content, 'utf8');
}

async function findHtmlFiles(dir, collected = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'dist') continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (path.relative(ROOT, fullPath).startsWith('includes')) continue;
      await findHtmlFiles(fullPath, collected);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      collected.push(fullPath);
    }
  }

  return collected;
}

async function build() {
  await ensureCleanDist();
  await copyStatic();
  const htmlFiles = await findHtmlFiles(ROOT);
  await Promise.all(htmlFiles.map(writeHtmlFile));
}

build().catch(error => {
  console.error('[build] Failed:', error);
  process.exitCode = 1;
});


