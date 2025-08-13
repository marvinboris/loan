import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(mobile: string): string {
  return '+' + mobile.split(' ').join('').split('+').join('');
}

export function buildFormData(
  obj: Record<string, string | number | boolean | undefined>
) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, initialValue]) => {
    if (initialValue) {
      let value: string;
      if (
        typeof initialValue === 'string' &&
        initialValue.startsWith('file://')
      ) {
        const fileType = initialValue.split('.').pop();
        value = {
          uri: initialValue,
          name: key + '.' + fileType,
          type: 'image/' + fileType,
        } as any;
      } else value = initialValue as any;

      formData.append(key, value);
    }
  });

  return formData;
}
