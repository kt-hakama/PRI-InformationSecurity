import { scenarios } from '@/data/scenarios';
import TrainingPageClient from './TrainingPageClient';

export function generateStaticParams() {
  return scenarios.map((s) => ({ id: s.id }));
}

export default function TrainingPage({
  params,
}: {
  params: { id: string };
}) {
  return <TrainingPageClient id={params.id} />;
}
