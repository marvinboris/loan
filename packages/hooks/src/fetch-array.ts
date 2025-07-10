import { useFetchData } from './fetch-data';

export function useFetchArray<T extends object>(url: string) {
  return useFetchData<{ items: T[]; totalPages: number }>(url);
}
