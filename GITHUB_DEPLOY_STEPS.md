# GitHub 登録後のデプロイ手順

GitHub の登録が完了したあと、リポジトリへコードを push し、Web にデプロイする手順です。

---

## ステップ1：GitHub にリポジトリを作る

1. **https://github.com/new** を開く。
2. **Repository name** に名前を入力（例: `RFtraining` または `rf-training`）。
3. **Public** を選択。
4. **「Add a README file」にはチェックを入れない**（すでにローカルにプロジェクトがあるため）。
5. **Create repository** をクリック。
6. 作成後、表示される **リポジトリの URL** を控える。  
   例: `https://github.com/あなたのユーザー名/RFtraining.git`

---

## ステップ2：プロジェクトを GitHub に push する

プロジェクトのフォルダ（`RFtraining` がある場所）で、ターミナル（PowerShell やコマンドプロンプト）を開き、次を**順番に**実行する。

### 2-1. プロジェクトのフォルダに移動

```bash
cd c:\Users\yas48\Documents\_CURSOR\RFtraining
```

（パスは実際のプロジェクトの場所に合わせて変更してください。）

### 2-2. Git を初期化（まだの場合）

```bash
git init
```

「Reinitialized existing Git repository」と出る場合は、すでに初期化済みなのでそのまま次へ。

### 2-3. ファイルを追加してコミット

```bash
git add .
git status
```

`.gitignore` により `node_modules` や `.next`、`out` は追加されません。問題なければ:

```bash
git commit -m "Initial commit: RF training app"
```

### 2-4. メインブランチ名を main にする

```bash
git branch -M main
```

### 2-5. GitHub のリポジトリを「リモート」として登録

**`あなたのユーザー名` と `リポジトリ名` を、ステップ1で作ったリポジトリに合わせて書き換えてください。**

```bash
git remote add origin https://github.com/あなたのユーザー名/RFtraining.git
```

すでに `origin` がある場合は、次のように変更できます。

```bash
git remote set-url origin https://github.com/あなたのユーザー名/RFtraining.git
```

### 2-6. プッシュする

```bash
git push -u origin main
```

GitHub にログインするよう求められたら、ブラウザまたはトークンで認証する。  
完了すると、GitHub のリポジトリにファイルが反映されています。

---

## ステップ3：Web にデプロイする（2つの選択肢）

GitHub にコードが上がったあと、**どちらか一方**の方法でデプロイできます。

---

### 方法A：Netlify でデプロイ（Git 連携・おすすめ）

**特徴:** GitHub と連携すると、`main` に push するたびに自動でビルド・デプロイされる。

1. **https://www.netlify.com/** にアクセスし、ログイン。
2. **「Add new site」→「Import an existing project」** をクリック。
3. **「Deploy with GitHub」** を選び、GitHub の認証を許可する。
4. **リポジトリ一覧からこのプロジェクト（例: RFtraining）を選択**。
5. **Build settings** を次のように設定する。
   - **Branch to deploy:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
6. **「Deploy site」** をクリック。
7. ビルドが終わると、**https://ランダムな名前.netlify.app** のような URL で公開されます。
8. （任意）「Site settings」→「Change site name」で名前を変更可能（例: `rf-training` → `https://rf-training.netlify.app`）。

**以降:** コードを直したら `git add .` → `git commit -m "メッセージ"` → `git push` するだけで、Netlify が自動で再ビルド・再デプロイします。

---

### 方法B：Vercel でデプロイ

**特徴:** Next.js の開発元のサービス。GitHub 連携で push のたびに自動デプロイ。

1. **https://vercel.com** にアクセスし、ログイン（GitHub で登録可能）。
2. **「Add New」→「Project」** をクリック。
3. **Import Git Repository** で、このプロジェクトのリポジトリを選択。
4. **Configure Project** で次を確認・設定する。
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`（そのままで可）
   - **Output Directory:** **`out`** に変更する（重要。デフォルトは `.next`）
   - **Install Command:** `npm install`（そのままで可）
5. **「Deploy」** をクリック。
6. 完了後、**https://プロジェクト名.vercel.app** で公開されます。

**以降:** `git push` するたびに自動でビルド・デプロイされます。

---

## うまくいかないときの確認

- **Build が失敗する**  
  - Netlify/Vercel のビルドログを開き、エラー内容を確認する。  
  - ローカルで `npm run build` が成功するか確認する。
- **サイトは開くが CSS が効かない・リンクがおかしい**  
  - **Publish directory が `out` になっているか**を確認する（`out` の中身が配信される想定）。
  - ビルドコマンドが `npm run build` になっているか確認する（`next build` だけだと `fix-asset-paths.js` が動かず不具合が出ます）。
- **push が拒否される**  
  - リモートの URL（`git remote -v`）が正しいか確認する。  
  - GitHub の認証（パスワードではなく Personal Access Token が必要な場合あり）を確認する。

---

## まとめ

| 順番 | やること |
|------|----------|
| 1 | GitHub で新しいリポジトリを作成（README なし） |
| 2 | ローカルで `git init` → `git add .` → `git commit` → `git remote add origin` → `git push -u origin main` |
| 3 | Netlify または Vercel で「Import from GitHub」を選び、リポジトリを指定 |
| 4 | Build command: `npm run build`、Publish directory: `out` に設定してデプロイ |

ここまで完了すると、公開 URL でアプリにアクセスできます。
