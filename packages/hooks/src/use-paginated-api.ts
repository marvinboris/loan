import { useApiWeb } from './use-api-web';

export function usePaginatedApi<T extends object>(url: string) {
  return useApiWeb<{ items: T[]; total: number }>('/admin' + url);
}
