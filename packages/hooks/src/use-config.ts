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
    divider: '#d0d0d0',
    grey0: '#909090',
    grey1: '#a0a0a0',
    grey2: '#b0b0b0',
    grey3: '#c0c0c0',
    grey4: '#d0d0d0',
    grey5: '#f0f0f0',
  };

  const getColor = (color: keyof Omit<typeof theme, 'platform'>) =>
    theme[color] || '';

  return {
    theme,
    getColor,
  };
}
