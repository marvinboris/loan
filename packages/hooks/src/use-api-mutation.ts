import React from 'react';

// Hook pour les mutations (POST, PUT, DELETE)
export const useApiMutation = <T, P = any>(
  mutationFn: (params: P) => Promise<T>
) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const mutate = async (params: P): Promise<T> => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFn(params);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occured';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};
