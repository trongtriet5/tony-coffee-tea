'use client';

import { useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export function WarmupProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (API_URL) {
      fetch(`${API_URL}/warmup`).catch(() => {});
    }
  }, []);

  return <>{children}</>;
}
