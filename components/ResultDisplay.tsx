'use client';

import { Result } from '@/types';
import AppLink from '@/components/AppLink';
import { useLanguage } from '@/context/LanguageContext';

interface ResultDisplayProps {
  result: Result;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const { t } = useLanguage();
  const percentage = Math.round((result.score / result.totalPoints) * 100);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <AppLink
          href="/"
          className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline"
        >
          ← {t.backToTop}
        </AppLink>
      </div>
      <h1 className="text-xl font-bold text-gray-800 mb-6">
        {result.scenario.title}
      </h1>
      {/* スコア表示 */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {t.resultTitle}
        </h2>
        <div className="mb-4">
          <span className="text-6xl font-bold text-blue-600">
            {percentage}%
          </span>
        </div>
        <p className="text-xl text-gray-600">
          {result.score} / {result.totalPoints} {t.correctCount}
        </p>
      </div>

      {/* 詳細な解説 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {t.explanationTitle}
        </h3>
        
        <div className="space-y-4">
          {result.scenario.dangerPoints.map((point) => {
            const isSelected = result.selectedPoints.includes(point.id);
            const isCorrect = point.isCorrect;
            
            // 判定結果の決定
            let status: 'correct' | 'missed' | 'incorrect';
            if (isSelected && isCorrect) {
              status = 'correct';
            } else if (!isSelected && isCorrect) {
              status = 'missed';
            } else if (isSelected && !isCorrect) {
              status = 'incorrect';
            } else {
              // 選択されていない、かつ正解でもない -> 正しく選択しなかった
              status = 'correct';
            }
            
            const statusConfig = {
              correct: {
                bgColor: 'bg-green-50',
                borderColor: 'border-green-500',
                textColor: 'text-green-700',
                label: t.correct
              },
              missed: {
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-500',
                textColor: 'text-yellow-700',
                label: t.missed
              },
              incorrect: {
                bgColor: 'bg-red-50',
                borderColor: 'border-red-500',
                textColor: 'text-red-700',
                label: t.incorrect
              }
            };
            
            const config = statusConfig[status];
            
            // 正しく選択しなかった正解でない項目は表示しない
            if (status === 'correct' && !isSelected && !isCorrect) {
              return null;
            }
            
            return (
              <div
                key={point.id}
                className={`${config.bgColor} border-l-4 ${config.borderColor} p-4 rounded`}
              >
                <div className="flex items-start mb-2">
                  <span className={`${config.textColor} font-bold mr-2`}>
                    {config.label}
                  </span>
                  <p className="text-gray-800 flex-1">
                    {point.text}
                  </p>
                </div>
                {(isCorrect || isSelected) && (
                  <p className="text-gray-700 mt-2 pl-2">
                    <span className="font-semibold">{t.explanationLabel}</span> {point.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* アクションボタン */}
      <div className="text-center flex flex-wrap justify-center gap-4">
        <AppLink
          href={`/training/${result.scenario.id}`}
          className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
        >
          {t.backToScenario}
        </AppLink>
        <AppLink
          href="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {t.backToTopButton}
        </AppLink>
      </div>
    </div>
  );
}
