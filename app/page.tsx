'use client';

import AppLink from '@/components/AppLink';
import { useLanguage } from '@/context/LanguageContext';
import { getScenarios } from '@/data/scenarios';
import type { Scenario } from '@/types';

function ScenarioCard({
  scenario,
  difficultyLabel,
  difficultyBadgeClass,
}: {
  scenario: Scenario;
  difficultyLabel: string;
  difficultyBadgeClass: string;
}) {
  return (
    <AppLink
      href={`/training/${scenario.id}`}
      className="block bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-colors shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold text-gray-800 flex-1">{scenario.title}</span>
        <span
          className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded ${difficultyBadgeClass}`}
          aria-label={difficultyLabel}
        >
          {difficultyLabel}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {scenario.description}
      </p>
    </AppLink>
  );
}

export default function Home() {
  const { lang, t } = useLanguage();
  const scenarios = getScenarios(lang);
  const easyScenarios = scenarios.filter((s) => (s.difficulty ?? 'easy') === 'easy');
  const hardScenarios = scenarios.filter((s) => s.difficulty === 'hard');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-block px-2.5 py-1 text-sm font-medium rounded bg-amber-100 text-amber-800" aria-label={t.betaLabel}>
            {t.betaLabel}
          </span>
        </div>
        <p className="text-sm text-amber-800/90 mb-4">
          {t.betaNotice}
        </p>
        <p className="text-xl font-semibold text-gray-800 leading-relaxed mb-6">
          {t.welcomeDesc}
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h3 className="font-bold text-blue-900 mb-2">{t.flowTitle}</h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>{t.flow1}</li>
            <li>{t.flow2}</li>
            <li>{t.flow3}</li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {t.selectScenario}
          </h3>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500" aria-hidden />
              {t.scenariosEasy}
            </h4>
            <div className="space-y-3">
              {easyScenarios.map((scenario) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  difficultyLabel={t.difficultyEasy}
                  difficultyBadgeClass="bg-green-100 text-green-800"
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500" aria-hidden />
              {t.scenariosHard}
            </h4>
            <div className="space-y-3">
              {hardScenarios.map((scenario) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  difficultyLabel={t.difficultyHard}
                  difficultyBadgeClass="bg-amber-100 text-amber-800"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {t.learningPoints}
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>{t.learning1}</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>{t.learning2}</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>{t.learning3}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
