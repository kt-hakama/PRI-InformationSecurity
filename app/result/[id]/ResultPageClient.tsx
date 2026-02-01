'use client';

import { useEffect, useState } from 'react';
import AppLink from '@/components/AppLink';
import ResultDisplay from '@/components/ResultDisplay';
import { getScenarioById } from '@/data/scenarios';
import { Result } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export default function ResultPageClient({ id }: { id: string }) {
  const { lang, t } = useLanguage();
  const [result, setResult] = useState<Result | null>(null);
  const [checked, setChecked] = useState(false);
  const scenario = getScenarioById(id, lang);

  useEffect(() => {
    if (typeof window !== 'undefined' && scenario) {
      const selectedPointsStr = sessionStorage.getItem('selectedPoints');
      const scenarioId = sessionStorage.getItem('scenarioId');
      if (selectedPointsStr && scenarioId === id) {
        const selectedPoints: string[] = JSON.parse(selectedPointsStr);
        const correctPoints = scenario.dangerPoints
          .filter((point) => point.isCorrect)
          .map((point) => point.id);
        const correctSelections = selectedPoints.filter((pid) =>
          correctPoints.includes(pid)
        );
        setResult({
          scenario,
          selectedPoints,
          correctPoints,
          score: correctSelections.length,
          totalPoints: correctPoints.length,
        });
      }
    }
    setChecked(true);
  }, [id, scenario]);

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

  if (!result && checked) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">{t.noResult}</p>
          <AppLink
            href={`/training/${id}`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {t.startTraining}
          </AppLink>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">{t.loadingResult}</p>
        </div>
      </div>
    );
  }

  return <ResultDisplay result={result} />;
}
