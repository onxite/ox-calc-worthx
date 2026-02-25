import { useState } from 'react';
import type { UserPath } from '@/constants/paths';
import { PathSelector } from '@/components/PathSelector';
import { ValuationConsultant } from '@/components/ValuationConsultant';

export default function App() {
  const [path, setPath] = useState<UserPath | null>(null);

  if (!path) {
    return <PathSelector onSelect={setPath} />;
  }

  return <ValuationConsultant path={path} onBack={() => setPath(null)} />;
}
