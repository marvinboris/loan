import { getHttpClient } from '@creditwave/utils';
import React from 'react';

export function useApi<T>(url: string) {
  const [data, setData] = React.useState<T>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();

  const execute = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(undefined);
      const httpClient = getHttpClient();
      const result = await httpClient.get<T>(url);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occured';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url]);

  React.useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
}
