import React from 'react';

// Hook pour les requêtes avec état local
export const useApiQuery = <T>(
  queryFn: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const execute = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await queryFn();
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
  }, dependencies);

  React.useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
};
