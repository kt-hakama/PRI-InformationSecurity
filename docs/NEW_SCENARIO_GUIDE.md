# 新規シナリオの追加手順

新しいシナリオを追加するには、**日本語**と**英語**の2ファイルに同じ `id` でシナリオを追加し、それぞれの配列に登録します。

---

## 1. シナリオの型（`types/index.ts`）

- **Scenario**: `id`, `title`, `description`, `situation`, `dangerPoints`, （任意）`difficulty`
- **DangerPoint**: `id`, `text`, `isCorrect`, `explanation`
- **difficulty**: `'easy'` または `'hard'`（省略時は easy）

---

## 2. 追加する場所

| ファイル | やること |
|----------|----------|
| `data/scenarios.ts` | 日本語のシナリオオブジェクトを定義し、`scenarios` 配列に追加 |
| `data/scenariosEn.ts` | 英語のシナリオオブジェクトを定義し、`scenariosEn` 配列に追加 |

**重要**: 両方のファイルで **同じ `id`** を使うこと（例: `scenario-005`, `scenario-005-hard`）。

---

## 3. ID のルール

- **易しいシナリオ**: `scenario-001`, `scenario-002`, … → 次の番号は `scenario-005`
- **難しいシナリオ**: `scenario-001-hard`, `scenario-002-hard`, … → 次の番号は `scenario-005-hard`
- **危険ポイント**: シナリオごとに一意（例: `point-501`, `point-502` または `point-005h-1`）

---

## 4. テンプレート（コピー用）

### 日本語（`data/scenarios.ts` に追加）

```ts
export const sampleScenario005: Scenario = {
  id: 'scenario-005',
  difficulty: 'easy',  // または 'hard'
  title: 'シナリオのタイトル',
  description: 'シナリオの短い説明（何をしてもらうか）。',
  situation: `
シナリオの本文（状況説明）をここに書く。
複数行可。.trim() で前後の空白は削除される。
  `.trim(),
  dangerPoints: [
    {
      id: 'point-501',
      text: '正解の危険ポイントの文言',
      isCorrect: true,
      explanation: 'なぜこれが危険か・正解の解説。',
    },
    {
      id: 'point-502',
      text: '不正解の選択肢（紛らわしいが危険でない）',
      isCorrect: false,
      explanation: 'なぜこれは危険ポイントではないか。',
    },
    // 必要に応じて追加
  ],
};
```

### 英語（`data/scenariosEn.ts` に追加）

```ts
export const sampleScenario005En: Scenario = {
  id: 'scenario-005',  // 日本語と同じ id
  difficulty: 'easy',
  title: 'Scenario title in English',
  description: 'Short description of what the user will do.',
  situation: `
Scenario body (situation) in English.
  `.trim(),
  dangerPoints: [
    {
      id: 'point-501',  // 日本語と同じ id
      text: 'Correct risk point text in English',
      isCorrect: true,
      explanation: 'Explanation in English.',
    },
    {
      id: 'point-502',
      text: 'Incorrect option text in English',
      isCorrect: false,
      explanation: 'Why this is not a risk.',
    },
  ],
};
```

---

## 5. 配列への登録

### `data/scenarios.ts` の末尾

```ts
export const scenarios: Scenario[] = [
  sampleScenario,
  sampleScenario2,
  sampleScenario3,
  sampleScenario4,
  sampleScenario001Hard,
  sampleScenario002Hard,
  sampleScenario003Hard,
  sampleScenario004Hard,
  sampleScenario005,  // 追加
];
```

### `data/scenariosEn.ts` の末尾

```ts
export const scenariosEn: Scenario[] = [
  sampleScenarioEn,
  sampleScenario2En,
  sampleScenario3En,
  sampleScenario4En,
  sampleScenario001HardEn,
  sampleScenario002HardEn,
  sampleScenario003HardEn,
  sampleScenario004HardEn,
  sampleScenario005En,  // 追加
];
```

---

## 6. ビルド確認

```bash
npm run build
```

`generateStaticParams` が `scenarios` の id 一覧で静的ページを生成するため、**日本語の `scenarios` に追加すれば** トレーニング・結果ページは自動で生成されます。英語は `getScenarioById(id, 'en')` で同じ id から英語データを取得します。

---

## 7. チェックリスト

- [ ] `data/scenarios.ts` に日本語シナリオを追加
- [ ] `data/scenarios.ts` の `scenarios` 配列に追加
- [ ] `data/scenariosEn.ts` に英語シナリオを追加（**同じ id**）
- [ ] `data/scenariosEn.ts` の `scenariosEn` 配列に追加
- [ ] `npm run build` が成功することを確認
