import { useState, useEffect } from 'react';
import { fetchSkips, SkipOption } from '../services/skipApi';

export function useSkips(postcode: string, area: string) {
  const [skips, setSkips] = useState<SkipOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSkips(postcode, area)
      .then((data) => {
        console.log('Fetched skips:', data);
        setSkips(data);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [postcode, area]);

  return { skips, loading, error };
}