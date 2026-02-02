# RFtraining → PRI-Training への変更手順

**実行はせず、手順のみまとめています。**

---

## 変更の順番（推奨）

| 順番 | どこを変更するか | 内容 |
|------|------------------|------|
| **1** | **ファイル・コード** | プロジェクト内の RFtraining / rf-training を PRI-Training / pri-training に置き換える |
| **2** | **Git** | 変更をコミットする（まだ push していなければここで push も可） |
| **3** | **GitHub** | リポジトリ名を RFtraining → PRI-Training（または pri-training）に変更する |
| **4** | **Git** | リモート URL を新しいリポジトリ名に合わせて更新する |
| **5** | **フォルダ** | ローカルのフォルダ名を RFtraining → PRI-Training に変更する |
| **6** | **Cursor** | 新しいフォルダ PRI-Training を開き直す |

**理由:** まず中身（名前の参照）を揃え、次に GitHub・Git・フォルダと「外側」を変えると、作業のやり直しが少なく済みます。

---

## 1. ファイル・コードの変更（順番の 1 番目）

**作業場所:** いまの RFtraining フォルダを Cursor で開いたまま。

次のファイルを編集し、**RFtraining / rf-training / RF training** を **PRI-Training / pri-training / PRI-Training** に置き換える。

### 1-1. package.json

| 箇所 | 変更前 | 変更後 |
|------|--------|--------|
| `"name"` | `"rf-training"` | `"pri-training"` |

※ npm のパッケージ名は小文字が一般的なため **pri-training** にします。

### 1-2. package-lock.json

- 先頭付近の `"name": "rf-training"` を `"name": "pri-training"` に変更。
- ルートの `"name": "rf-training"` も同様に `"name": "pri-training"` に変更。

（`npm install` をやり直すと自動で書き変わるため、手で直さず後で `npm install` だけでも可。）

### 1-3. README.md

| 箇所 | 変更前 | 変更後 |
|------|--------|--------|
| 1 行目 | `# 情報セキュリティ危険予知トレーニング (RF Training)` | `# 情報セキュリティ危険予知トレーニング (PRI-Training)` |

### 1-4. DEPLOY.md

| 箇所 | 変更前 | 変更後 |
|------|--------|--------|
| 例のサイト名 | `rf-training` | `pri-training` |
| Netlify URL 例 | `https://rf-training.netlify.app` | `https://pri-training.netlify.app` |
| リポジトリ例 | `rf-training` | `pri-training` または `PRI-Training` |
| git remote 例 | `rf-training.git` | `PRI-Training.git`（GitHub のリポジトリ名に合わせる） |

### 1-5. GITHUB_DEPLOY_STEPS.md

| 箇所 | 変更前 | 変更後 |
|------|--------|--------|
| Repository name 例 | `RFtraining` または `rf-training` | `PRI-Training` または `pri-training` |
| リポジトリ URL 例 | `RFtraining.git` | `PRI-Training.git` |
| フォルダのパス例 | `c:\Users\...\RFtraining` | `c:\Users\...\PRI-Training` |
| コミットメッセージ例 | `Initial commit: RF training app` | `Initial commit: PRI-Training app` |
| git remote の URL 例 | `RFtraining.git` | `PRI-Training.git` |
| Netlify の例 | `rf-training` | `pri-training` |

### 1-6. MOVING.md

| 箇所 | 変更前 | 変更後 |
|------|--------|--------|
| フォルダ名の例 | `RFtraining` | `PRI-Training` |
| パス例 | `Documents\RFtraining`、`C:\dev\RFtraining` など | `Documents\PRI-Training`、`C:\dev\PRI-Training` など |

### 1-7. その他

- **DEPLOY_SPEC.md** … プロジェクト名やリポジトリ名の例があれば、同様に PRI-Training / pri-training に統一。
- **アプリのソースコード（.ts / .tsx）** … 検索した限り、RFtraining や rf-training の文字列はありません。変更不要です。

---

## 2. Git：コミット（順番の 2 番目）

**作業場所:** 同じく RFtraining フォルダで。

```bash
git add .
git status
git commit -m "Rename project: RFtraining → PRI-Training"
```

まだ GitHub に push していない場合は、ここで push してもよい（次の「3. GitHub」のあとで push でも可）。

---

## 3. GitHub：リポジトリ名の変更（順番の 3 番目）

**作業場所:** ブラウザで GitHub にログインした状態。

1. 対象リポジトリ（いまの RFtraining）を開く。
2. **「Settings」** をクリック。
3. 一番上の **「Repository name」** を次のいずれかに変更する。
   - **PRI-Training**（表示名どおり）
   - **pri-training**（URL では小文字になるため、こちらの場合もあり）
4. **「Rename」** をクリック。

※ リポジトリ名を変えると、古い URL はしばらくリダイレクトされますが、ローカルのリモート URL はあとで更新します。

---

## 4. Git：リモート URL の更新（順番の 4 番目）

**作業場所:** まだ RFtraining フォルダのまま。ターミナルで実行。

**GitHub のリポジトリ名を PRI-Training にした場合:**

```bash
git remote set-url origin https://github.com/あなたのユーザー名/PRI-Training.git
```

**pri-training にした場合:**

```bash
git remote set-url origin https://github.com/あなたのユーザー名/pri-training.git
```

確認:

```bash
git remote -v
```

`origin` が新しい URL を指していれば OK。

---

## 5. フォルダ名の変更（順番の 5 番目）

**この前に Cursor でこのフォルダを閉じる。**

1. Cursor で **「File」→「Close Folder」**（またはウィンドウを閉じる）。
2. エクスプローラーで **`c:\Users\yas48\Documents\_CURSOR\`** を開く。
3. **RFtraining** フォルダを右クリック → **「名前の変更」**。
4. **PRI-Training** と入力して Enter。

---

## 6. Cursor：新しいフォルダを開く（順番の 6 番目）

1. Cursor を起動する。
2. **「File」→「Open Folder」**。
3. **`c:\Users\yas48\Documents\_CURSOR\PRI-Training`** を選んで開く。

---

## 変更箇所の一覧（参照用）

| 対象 | 変更内容 |
|------|----------|
| **package.json** | `name` を `pri-training` に |
| **package-lock.json** | `name` を `pri-training` に（または後で `npm install` で更新） |
| **README.md** | タイトルの RF Training → PRI-Training |
| **DEPLOY.md** | 例の rf-training / RFtraining → pri-training / PRI-Training |
| **GITHUB_DEPLOY_STEPS.md** | 例の RFtraining / rf-training / パス → PRI-Training / pri-training / 新パス |
| **MOVING.md** | 例の RFtraining / パス → PRI-Training / 新パス |
| **GitHub** | リポジトリ名を PRI-Training（または pri-training）に変更 |
| **Git** | `git remote set-url origin` で新しいリポジトリ URL に更新 |
| **フォルダ** | RFtraining → PRI-Training にリネーム |
| **Cursor** | 閉じてから PRI-Training フォルダを開き直す |

---

## 注意

- **実行はまだしない**前提で書いてあります。実際に変更するときは、この順番どおりに進めると安全です。
- **package-lock.json** は、`package.json` の `name` を変えたあとで `npm install` を実行すると自動で更新されます。手で直さず、それでもかまいません。
- GitHub のリポジトリ名に **大文字の PRI-Training** を使うか **小文字の pri-training** にするかは、運用方針に合わせて決めてください。上記はどちらの場合のコマンド例も書いてあります。
