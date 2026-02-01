'use client';

import { DangerPoint } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface DangerPointChecklistProps {
  dangerPoints: DangerPoint[];
  selectedPoints: string[];
  onTogglePoint: (pointId: string) => void;
}

export default function DangerPointChecklist({
  dangerPoints,
  selectedPoints,
  onTogglePoint
}: DangerPointChecklistProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {t.checkDangerPoints}
      </h3>
      <div className="space-y-3">
        {dangerPoints.map((point) => (
          <label
            key={point.id}
            className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedPoints.includes(point.id)}
              onChange={() => onTogglePoint(point.id)}
              className="mt-1 mr-3 w-5 h-5 text-blue-600"
            />
            <span className="text-gray-700 flex-1">
              {point.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
