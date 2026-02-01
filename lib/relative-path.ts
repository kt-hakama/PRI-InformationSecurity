/**
 * 現在の pathname から target への相対パスを返す。
 * file:// で開いたときにリンクが動くようにするため。
 * @param forFileProtocol true のときは .html ファイル直指定（Next.js 静的エクスポートは training/scenario-001.html 形式）
 */
export function getRelativePath(
  currentPathname: string,
  targetHref: string,
  forFileProtocol = false
): string {
  let fromSegments = currentPathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
  const toSegments = targetHref.replace(/^\/|\/$/g, '').split('/').filter(Boolean);

  // file:// のときは「現在のファイルがあるディレクトリ」を基準にする。
  // 例: /training/scenario-001 → ファイルは training/scenario-001.html なのでディレクトリは training/ のみ
  if (forFileProtocol && fromSegments.length > 0) {
    fromSegments = fromSegments.slice(0, -1);
  }

  if (toSegments.length === 0) {
    const prefix = fromSegments.length === 0 ? './' : '../'.repeat(fromSegments.length);
    return forFileProtocol ? prefix + 'index.html' : prefix;
  }

  let commonLength = 0;
  while (
    commonLength < fromSegments.length &&
    commonLength < toSegments.length &&
    fromSegments[commonLength] === toSegments[commonLength]
  ) {
    commonLength++;
  }

  const up = fromSegments.length - commonLength;
  const rest = toSegments.slice(commonLength).join('/');
  const prefix = up > 0 ? '../'.repeat(up) : './';
  if (!forFileProtocol) {
    return rest ? prefix + rest + '/' : prefix;
  }
  // Next.js 静的エクスポートは training/scenario-001.html のように .html が直で出る
  return prefix + rest + '.html';
}
