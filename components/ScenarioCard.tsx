'use client';

import { Scenario } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface ScenarioCardProps {
  scenario: Scenario;
}

export default function ScenarioCard({ scenario }: ScenarioCardProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        {scenario.title}
      </h2>
      <p className="text-gray-600 mb-4">
        {scenario.description}
      </p>
      <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-semibold text-gray-700 mb-2">{t.scenarioLabel}</h3>
        <p className="text-gray-700 whitespace-pre-line">
          {scenario.situation}
        </p>
      </div>
    </div>
  );
}
