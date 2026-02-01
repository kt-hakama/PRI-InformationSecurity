/**
 * 静的エクスポート後の HTML を修正する。
 * 1. /_next/ を相対パスに（CSS/JS が読み込まれるように）
 * 2. 内部リンク（/training/..., /result/..., /）を相対パスに（index.html を直接開いても遷移できるように）
 */
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

function findHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

/** この HTML から out フォルダ直下への相対パス（アセット用） */
function getAssetPrefix(htmlFilePath) {
  const dir = path.dirname(htmlFilePath);
  const rel = path.relative(dir, outDir);
  if (!rel || rel === '.') return './';
  return rel.replace(/\\/g, '/') + '/';
}

/** この HTML からサイトルート（out）への相対パス（リンク用）。depth 0 -> './', depth 2 -> '../../' */
function getLinkPrefix(htmlFilePath) {
  const dir = path.dirname(htmlFilePath);
  const rel = path.relative(outDir, dir);
  const segments = rel ? rel.split(path.sep).filter(Boolean) : [];
  const depth = segments.length;
  return depth === 0 ? './' : '../'.repeat(depth);
}

const htmlFiles = findHtmlFiles(outDir);
if (htmlFiles.length === 0) {
  console.warn('fix-asset-paths: No HTML files found in out/');
  process.exit(0);
}

for (const filePath of htmlFiles) {
  const assetPrefix = getAssetPrefix(filePath);
  const linkPrefix = getLinkPrefix(filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  const before = content;

  // 1. アセット: href="/_next/ や src="/_next/ および ./_next/ を out からの相対パスに
  //    （ネストしたページ例: training/scenario-001.html では ./_next/ → ../_next/ にする）
  content = content.replace(/(href|src)=["']\.?\/?_next\//g, `$1="${assetPrefix}_next/`);
  content = content.replace(/"\.?\/?_next\//g, `"${assetPrefix}_next/`);

  // 2. 内部リンク: href="/..." および href='/...' を相対パスに。Next.js 静的エクスポートは training/scenario-001.html 形式
  content = content.replace(/href="\/([^"]*)"/g, (_, rest) => {
    if (!rest || rest.startsWith('_next')) return `href="/${rest}"`;
    const pathPart = rest.replace(/\/$/, '');
    const target = pathPart ? linkPrefix + pathPart + '.html' : linkPrefix + 'index.html';
    return `href="${target}"`;
  });
  content = content.replace(/href='\/([^']*)'/g, (_, rest) => {
    if (!rest || rest.startsWith('_next')) return `href='/${rest}'`;
    const pathPart = rest.replace(/\/$/, '');
    const target = pathPart ? linkPrefix + pathPart + '.html' : linkPrefix + 'index.html';
    return `href='${target}'`;
  });

  // 3. file:// 用: 現在パスを注入（AppLink が相対パスを計算するために使用）
  const relativeFile = path.relative(outDir, filePath).replace(/\\/g, '/');
  const currentPath = relativeFile === 'index.html'
    ? '/'
    : '/' + relativeFile.replace(/\.html$/, '').replace(/\/$/, '');
  if (!content.includes('__CURRENT_PATH__')) {
    content = content.replace(/<body([^>]*)>/, `<body$1><script>window.__CURRENT_PATH__="${currentPath}";</script>`);
  }

  if (content !== before) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('fix-asset-paths: Updated', path.relative(outDir, filePath));
  }
}

console.log('fix-asset-paths: Done.');
