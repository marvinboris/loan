import { useApi } from './use-api';

export function usePaginatedApi<T extends object>(url: string) {
  return useApi<{ items: T[]; total: number }>('/admin' + url);
}
