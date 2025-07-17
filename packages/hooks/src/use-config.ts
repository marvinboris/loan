import { Colors } from '@rneui/themed';

export function useConfig() {
  const theme: Partial<Colors> = {
    primary: '#252879',
    success: '#65a30d',
    error: '#dc2626',
    warning: '#d97706',
    disabled: '#e7e5e4',
    black: '#000000',
    white: '#ffffff',
  };

  const getColor = (color: keyof Omit<typeof theme, 'platform'>) =>
    theme[color] || '';

  return {
    theme,
    getColor,
  };
}
