import { requestState$ } from '@creditwave/utils';
import { useObservable, useObserve } from '@legendapp/state/react';
import React from 'react';

export const useRequest = () => {
  const request = useObservable(requestState$);

  const [loading, setLoading] = React.useState(request.loading.get());
  const [error, setError] = React.useState(request.error.get());

  useObserve(request.loading, () => setLoading(request.loading.get()));
  useObserve(request.error, () => setError(request.error.get()));

  return {
    loading,
    error,
    clearError: () => requestState$.error.set(null),
  };
};
