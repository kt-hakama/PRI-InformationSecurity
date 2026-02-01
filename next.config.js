/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的エクスポート: npm run build で out/ に index.html などが出力される
  output: 'export',
  // index.html を直接開く（file://）場合に必要
  assetPrefix: '.',
  // 静的エクスポート時は headers は無効になるため、ここでは設定しない。
  // 本番ではホスティング側（Netlify の _headers など）でセキュリティヘッダーを設定すること。SECURITY.md 参照。
};

module.exports = nextConfig;
