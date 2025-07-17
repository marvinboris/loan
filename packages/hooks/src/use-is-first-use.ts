import { isFirstUseState$ } from '@creditwave/utils';
import React from 'react';

export function useIsFirstUse() {
  const [isFirstUse, setIsFirstUse] = React.useState(isFirstUseState$.get());

  isFirstUseState$.onChange((e) => setIsFirstUse(e.value));

  return { isFirstUse, setIsFirstUse };
}
