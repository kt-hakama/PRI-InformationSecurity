# 情報セキュリティ危険予知トレーニング (RF Training)

情報セキュリティに関する危険予知トレーニング用のMVPアプリケーションです。

## 機能

- シナリオベースのセキュリティトレーニング
- 危険ポイントのチェック機能
- 結果表示と解説

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## Web に公開する（index.html について）

このプロジェクトは **Next.js** のため、ソースには `index.html` がありません。Next.js がビルド時に HTML を生成します。

### 静的エクスポートで index.html を出力する

`next.config.js` で `output: 'export'` を指定しているため、次のコマンドで **静的サイト** がビルドされます。

```bash
npm run build
```

ビルドが成功すると、**`out` フォルダ** に次のようなファイルが出力されます。  
ビルド後、`scripts/fix-asset-paths.js` が自動で実行され、次を置換します。  
- アセット（`/_next/`）→ 相対パス（CSS/JS が読み込まれる）  
- 内部リンク（`/training/...` や `/`）→ 相対パス（シナリオを選んでも「connection failed」にならない）  
これにより **`index.html` を直接開いても、スタイルが反映され、シナリオリンクで正しく遷移できます。**

- **`out/index.html`** … トップページ
- `out/training/scenario-001.html` … シナリオ1のトレーニングページ（Next.js は .html ファイルを直で出力）
- `out/training/scenario-002.html`、`out/training/scenario-003.html`
- `out/result/scenario-001.html` など … 結果ページ
- その他 JS / CSS などの静的ファイル

### デプロイ手順

1. 上記のとおり `npm run build` を実行する
2. **`out` フォルダの中身** を、そのまま Web サーバーやホスティングにアップロードする

#### ホスティングの例

- **GitHub Pages** … `out` の内容を `gh-pages` ブランチや `docs` フォルダに配置
- **Netlify** … リポジトリを連携し、ビルドコマンド `npm run build`、公開フォルダ `out` に設定
- **Vercel** … リポジトリを連携するだけで Next.js として自動ビルド・デプロイ（静的エクスポートも対応）
- **その他のレンタルサーバー** … FTP 等で `out` 内のファイルを `public_html` などにアップロード

静的エクスポート時は、セキュリティヘッダーは **自動では付きません**。必要なら、ホスティング側の設定（Netlify の `_headers`、サーバーの設定など）で HTTP ヘッダーを付与してください。詳しくは `SECURITY.md` を参照してください。

### ビルドで EINVAL / readlink エラー（errno -4071）が出る場合

Windows や iCloud Drive 上で、`.next` フォルダ内のシンボリックリンクなどが原因で `readlink` エラーになることがあります。

**対処:** `.next` フォルダを削除してから再ビルドしてください。

```powershell
# PowerShell の場合（プロジェクトフォルダで実行）
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run build
```

または、エクスプローラーで **`.next` フォルダを手動で削除**してから、もう一度 `npm run build` を実行してください。  
`npm run clean` で `.next` と `out` を削除してからビルドする方法もあります。

**プロジェクトを iCloud Drive 外などに移動したい場合** は、**[MOVING.md](MOVING.md)** に移動時の注意点と手順をまとめています。

### ビルド時のアラートについて

`npm run build` で次のようなメッセージが出ることがあります。

| メッセージ | 意味 | 対処 |
|------------|------|------|
| **Specified "headers" will not work with "output: export"** | 静的エクスポートではカスタムヘッダーが使われないという通知 | 無視して問題ありません。本番ではホスティング側でヘッダーを設定できます。 |
| **npm warn Unknown env config "devdir"** など | npm の環境設定に関する警告 | ビルド結果には影響しません。必要なら `npm update -g npm` で npm を更新できます。 |
| **Route (app) ...** などの情報ログ | ビルド対象のルート一覧 | 正常な情報表示です。 |

**✓ Finalizing page optimization** のあと、**Route (app)** の一覧（`/`、`/training/scenario-001` など）が表示され、コマンドが正常終了していればビルドは成功しています。Next.js 14 では「Export successful」などの文言は出ないことがあります。プロジェクト直下に **`out`** フォルダができていれば静的ファイルの出力も完了しています。

## プロジェクト構造

- `/app` - Next.js App Router のページとレイアウト
- `/components` - 再利用可能なコンポーネント
- `/types` - TypeScript型定義
- `/data` - シナリオデータ
- `/out` - `npm run build` 実行後に生成される静的ファイル（index.html 含む）
