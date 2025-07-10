import React from 'react';
import { useSearchParams } from 'react-router-dom';

export function useFetchData<T>(url: string) {
  const [params] = useSearchParams();

  const [data, setData] = React.useState<T>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error>();

  React.useEffect(() => {
    const handle = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    handle();
  }, [params, url]);

  return { data, loading, error };
}
