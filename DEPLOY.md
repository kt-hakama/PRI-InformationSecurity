# Web にアップする手順

このプロジェクトは静的エクスポート（`out/` フォルダ）を使っています。以下の手順で Web に公開できます。

---

## 共通：公開前の準備

1. **ビルドを実行**
   ```bash
   npm run build
   ```
2. **`out/` フォルダが作られていることを確認**
   - `out/index.html`
   - `out/training/` や `out/result/` 内の HTML
   - `out/_next/` 内の CSS・JS

この **`out/` フォルダの中身** をそのままホスティング先にアップロードします（`out` フォルダごとではなく、**中身**をアップロード）。

---

## 方法1：Netlify（おすすめ・手軽）

**特徴:** 無料枠あり。ドラッグ＆ドロップでアップロードできる。

### 手順

1. **https://www.netlify.com/** にアクセスし、アカウントを作成（GitHub やメールで登録可能）。

2. **ダッシュボード**で「Add new site」→「Deploy manually」を選ぶ。

3. **「out」フォルダの中身をドラッグ＆ドロップ**
   - 開くフォルダ: プロジェクト内の **`out`** フォルダ
   - その **中身**（index.html、training フォルダ、_next フォルダなど）を、Netlify の「Drag and drop your site output folder here」の枠にドラッグする。
   - ※「out」フォルダそのものではなく、中身をドロップする。

4. しばらくするとデプロイが完了し、**https://ランダムな名前.netlify.app** のような URL が表示されます。

5. （任意）サイト名を変更したい場合  
   「Site settings」→「Change site name」で、例: `rf-training` にすると  
   **https://rf-training.netlify.app** になります。

### 更新するとき

- コードを直したら、もう一度 `npm run build` を実行。
- Netlify の「Deploys」タブで、新しい **`out` の中身** を同じようにドラッグ＆ドロップすると上書きされます。
- または「Sites」→ 対象サイト → 「Deploys」→「Drag and drop」で同じ操作。

---

## 方法2：GitHub Pages

**特徴:** 無料。GitHub にリポジトリを push して、そこから公開する方法。

### 前提

- GitHub アカウントがあること。
- プロジェクトを GitHub のリポジトリに push できること。

### 手順

1. **GitHub にリポジトリを作成**
   - https://github.com/new で新規リポジトリ作成（例: `rf-training`）。

2. **プロジェクトを push**（まだの場合）
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/あなたのユーザー名/rf-training.git
   git push -u origin main
   ```

3. **ビルド**
   ```bash
   npm run build
   ```

4. **GitHub Actions でデプロイする場合（推奨）**
   - リポジトリに `.github/workflows/deploy.yml` を用意し、push のたびに `npm run build` して `out/` を GitHub Pages にデプロイする方法があります。必要ならこのワークフローファイルを別途用意できます。

5. **手動でアップロードする場合**
   - リポジトリの「Settings」→「Pages」を開く。
   - Source で「Deploy from a branch」を選ぶ。
   - Branch で `main`（または使っているブランチ）、Folder で `/ (root)` を選ぶと、リポジトリのルートが公開されます。  
   - 静的サイトの内容は **`out/` の中身** である必要があるため、通常は「GitHub Actions」でビルド結果（`out/` の中身）をデプロイする運用にします。  
   - 手動のみの場合は、別ブランチ（例: `gh-pages`）に `out/` の中身だけを push し、Pages の Source でそのブランチを指定する方法があります。

※ GitHub Pages を初めて使う場合は、「Actions」でワークフローを有効にしておくとスムーズです。

---

## 方法3：Vercel

**特徴:** Next.js の開発元。Git と連携すると push するだけでビルド＆公開される。

1. **https://vercel.com** でアカウント作成（GitHub 連携が便利）。

2. **「Add New Project」**で、GitHub のリポジトリをインポート。

3. **Build and Output Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: **`out`** に変更（Vercel は通常 `.next` を使うため、ここで `out` を指定）。

4. **Deploy** をクリック。完了後、**https://プロジェクト名.vercel.app** で公開されます。

5. 以降は、main ブランチに push するたびに自動でビルド・デプロイされます。

---

## 公開後の確認

- トップページ（index.html）が開けること。
- シナリオを選んでトレーニング→回答→結果の流れが動くこと。
- 日本語／英語の切り替えができること。
- スマホのブラウザでも表示・操作が問題ないこと。

---

## 注意点

- **アップロードするのは必ず `out/` の中身**です。プロジェクトのルートや `out` フォルダそのものをアップロードしないでください。
- 更新したときは、必ず **もう一度 `npm run build`** を実行してから、新しい `out/` の中身をアップロード（または Git に push）してください。
