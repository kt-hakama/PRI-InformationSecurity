import { scenarios } from '@/data/scenarios';
import ResultPageClient from './ResultPageClient';

export function generateStaticParams() {
  return scenarios.map((s) => ({ id: s.id }));
}

export default function ResultPage({
  params,
}: {
  params: { id: string };
}) {
  return <ResultPageClient id={params.id} />;
}
