import { getHttpClient } from '@creditwave/utils';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export function useApi<T>(url: string) {
  const [params] = useSearchParams();

  const [data, setData] = React.useState<T>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    const handle = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const httpClient = getHttpClient();
        const result = await httpClient.get<T>(url, { params });
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occured');
      } finally {
        setLoading(false);
      }
    };

    handle();
  }, [params, url]);

  return { data, loading, error };
}
