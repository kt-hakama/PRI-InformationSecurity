// 難易度
export type Difficulty = 'easy' | 'hard';

// シナリオの型定義
export interface Scenario {
  id: string;
  title: string;
  description: string;
  situation: string;
  dangerPoints: DangerPoint[];
  /** 難易度（省略時は easy） */
  difficulty?: Difficulty;
}

// 危険ポイントの型定義
export interface DangerPoint {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

// ユーザーの回答の型定義
export interface UserAnswer {
  scenarioId: string;
  selectedPoints: string[];
  timestamp: Date;
}

// 結果の型定義
export interface Result {
  scenario: Scenario;
  selectedPoints: string[];
  correctPoints: string[];
  score: number;
  totalPoints: number;
}
