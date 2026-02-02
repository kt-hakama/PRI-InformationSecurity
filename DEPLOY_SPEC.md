# デプロイ仕様書（専門家向け）

このアプリをデプロイする際に、専門家が把握すべき事項をまとめたものです。

---

## 1. アプリ概要

- **名称:** 情報セキュリティ危険予知トレーニング（Proactive Risk Insight - Risk Foresight Training (RFT) for Information Security。Proactive Risk Insight＝サービス名、Risk Foresight Training (RFT)＝トレーニング名）
- **種別:** 静的 Web アプリ（SPA 風だが、ページごとに静的 HTML が生成される）
- **用途:** シナリオを選び、危険ポイントをチェックして回答し、結果・解説を表示する教育用ツール
- **データ:** 回答はブラウザの `sessionStorage` のみ。サーバーへの送信・DB なし

---

## 2. 技術スタック

| 項目 | 内容 |
|------|------|
| **フレームワーク** | Next.js 14（App Router） |
| **言語** | TypeScript, React 18 |
| **スタイル** | Tailwind CSS |
| **ビルド結果** | 静的ファイルのみ（SSR/API なし） |

---

## 3. ビルド方法（必須）

### コマンド

```bash
npm install
npm run build
```

### 重要：ビルドは 2 段階

1. **`next build`** … `out/` に静的 HTML/CSS/JS を出力する。
2. **`node scripts/fix-asset-paths.js`** … `out/` 内の全 HTML を書き換え、以下を行う。
   - アセット（`/_next/` および `./_next/`）を、各 HTML の場所に応じた**相対パス**に変換（例: `training/*.html` では `../_next/`）。
   - 内部リンク（`href="/..."`）を `.html` 付き相対パスに変換。
   - `window.__CURRENT_PATH__` を注入（file:// および一部リンク用）。

**`npm run build` は上記の両方を実行する**（`package.json` の `"build": "next build && node scripts/fix-asset-paths.js"`）。  
デプロイ用の成果物は **必ずこの 2 段階ビルド後の `out/`** を使用すること。

---

## 4. 出力物（デプロイ対象）

- **デプロイするもの:** **`out/` フォルダの中身**（`out` という名前のフォルダごとではなく、その中身をドキュメントルートとして配信する）。

### 想定される構造

```
out/
├── index.html
├── 404.html
├── _next/
│   └── static/
│       ├── css/
│       └── chunks/
├── training/
│   ├── scenario-001.html
│   ├── scenario-002.html
│   └── …（シナリオ数に応じて増える）
└── result/
    ├── scenario-001.html
    └── …
```

- ルートの `index.html` がトップページ。
- `training/<id>.html` がシナリオページ、`result/<id>.html` が結果ページ。
- アセットはすべて `_next/static/` 以下で、各 HTML からは**相対パス**（`./_next/` または `../_next/`）で参照される。

---

## 5. ホスティング要件

| 項目 | 内容 |
|------|------|
| **種別** | 静的サイトホスティングのみ（Node サーバー不要） |
| **必要機能** | 静的ファイルの配信、ディレクトリインデックス不要（各ページが .html ファイル） |
| **ベース URL** | サブディレクトリ配信でも可（その場合は `next.config.js` の `assetPrefix` を変更する必要あり。現状は `'.'` でルート配信を想定） |

### 推奨

- Netlify / Vercel / GitHub Pages / Cloudflare Pages 等の静的ホスティングで問題なし。
- Vercel で Next としてデプロイする場合は、**Output Directory を `out` に設定**する必要あり（デフォルトの `.next` ではなく）。

---

## 6. 設定の要点（next.config.js）

```js
output: 'export',   // 静的エクスポート
assetPrefix: '.',   // 相対パスでアセットを参照（file:// およびサブパス対応）
```

- **`assetPrefix: '.'`** のため、ビルド直後の HTML には `./_next/` がそのまま書かれる。ネストしたページ（例: `training/scenario-001.html`）では、`fix-asset-paths.js` がこれを `../_next/` に書き換えないと CSS/JS が読めない。そのため **post-build スクリプトの実行が必須**。

---

## 7. 環境

- **Node.js:** 18.x 以上を推奨（package.json の engines 未指定のため、Next 14 が動くバージョン）。
- **npm:** `npm install` および `npm run build` が通ればよい。

---

## 8. 注意事項・制約

1. **ビルド後スクリプト必須**  
   `next build` だけでは、`out/training/*.html` などのアセットパスが正しくならない。必ず `scripts/fix-asset-paths.js` を実行すること。

2. **配信するのは `out/` の中身**  
   ドキュメントルートに `index.html` と `_next/`、`training/`、`result/` が並ぶ形にする。`out` というディレクトリをそのままルートにすると、URL が `/out/...` となり不整合になる。

3. **セキュリティヘッダー**  
   静的エクスポートでは Next の headers は効かない。X-Frame-Options や X-Content-Type-Options 等は、Netlify の `_headers` や Vercel の `vercel.json`、Cloudflare の設定など、**ホスティング側で設定**すること。詳細は `SECURITY.md` 参照。

4. **file:// 対応**  
   本アプリは `out/index.html` を file:// で開いても動作するよう、相対パスと `__CURRENT_PATH__` で設計されている。Web デプロイ時も、同じ `out/` をそのまま配信すればよい。

---

## 9. 参考にすべきファイル

| ファイル | 役割 |
|----------|------|
| `package.json` | 依存関係、`build` スクリプト（`next build && node scripts/fix-asset-paths.js`） |
| `next.config.js` | `output: 'export'`, `assetPrefix: '.'` |
| `scripts/fix-asset-paths.js` | ビルド後の HTML 修正（アセット・リンク・__CURRENT_PATH__） |
| `DEPLOY.md` | 手動デプロイ手順（Netlify / GitHub Pages / Vercel の概要） |
| `SECURITY.md` | セキュリティ方針とホスティング側で設定すべきヘッダー |

---

## 10. デプロイ後の確認ポイント

- トップ（`/` または `/index.html`）が表示されること。
- `/training/scenario-001.html` 等でシナリオページが開き、CSS が適用されていること。
- 回答送信後、`/result/scenario-001.html` 等で結果が表示されること。
- 日本語／英語の切り替えが動作すること。
- 「トップに戻る」等のリンクが、配信環境のルートに正しく遷移すること。

---

以上を専門家に渡せば、デプロイ方法の選定・CI/CD の組み方・ホスティング設定を一通り判断できる想定です。
