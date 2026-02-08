'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AppLink from '@/components/AppLink';
import ScenarioCard from '@/components/ScenarioCard';
import DangerPointChecklist from '@/components/DangerPointChecklist';
import { getScenarioById, getScenarioSequenceNumber } from '@/data/scenarios';
import { useLanguage } from '@/context/LanguageContext';
import { getRelativePath } from '@/lib/relative-path';

export default function TrainingPageClient({ id }: { id: string }) {
  const pathname = usePathname();
  const { lang, t } = useLanguage();
  const scenario = getScenarioById(id, lang);
  const [selectedPoints, setSelectedPoints] = useState<string[]>([]);
  const isFileProtocol =
    typeof window !== 'undefined' && window.location?.protocol === 'file:';
  const currentPath =
    typeof window !== 'undefined' && (window as unknown as { __CURRENT_PATH__?: string }).__CURRENT_PATH__;

  const handleTogglePoint = (pointId: string) => {
    setSelectedPoints((prev) =>
      prev.includes(pointId)
        ? prev.filter((p) => p !== pointId)
        : [...prev, pointId]
    );
  };

  const handleSubmit = () => {
    if (!scenario) return;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedPoints', JSON.stringify(selectedPoints));
      sessionStorage.setItem('scenarioId', scenario.id);
    }
    if (isFileProtocol) {
      window.location.href = getRelativePath(currentPath || pathname || `/training/${id}`, `/result/${scenario.id}`, true);
    } else {
      // 静的エクスポート環境では router.push() がクライアントエラーを起こすため、フルページ遷移を使用
      window.location.href = `/result/${scenario.id}`;
    }
  };

  const handleClearAll = () => {
    setSelectedPoints([]);
  };

  if (!scenario) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">{t.scenarioNotFound}</p>
          <AppLink href="/" className="text-blue-600 font-semibold hover:underline">
            {t.backToTop}
          </AppLink>
        </div>
      </div>
    );
  }

  // 常に相対パスを出力。ビルド時の静的HTMLに href="../index.html" が入り file:// で正しく動く
  const topHref = getRelativePath(`/training/${id}`, '/', true);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <a
          href={topHref}
          className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline"
        >
          ← {t.backToTop}
        </a>
      </div>
      <ScenarioCard
        scenario={scenario}
        sequenceNumber={getScenarioSequenceNumber(scenario.id, lang, scenario.difficulty ?? 'easy')}
      />
      <DangerPointChecklist
        dangerPoints={scenario.dangerPoints}
        selectedPoints={selectedPoints}
        onTogglePoint={handleTogglePoint}
      />
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleClearAll}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
        >
          {t.clearAll}
        </button>
        <button
          onClick={handleSubmit}
          disabled={selectedPoints.length === 0}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t.submitAnswer}
        </button>
      </div>
      {selectedPoints.length === 0 && (
        <p className="text-center text-gray-500 mt-4">{t.selectAtLeastOne}</p>
      )}
      <div className="mt-8 text-center">
        <a
          href={topHref}
          className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline"
        >
          ← {t.backToTop}
        </a>
      </div>
    </div>
  );
}
