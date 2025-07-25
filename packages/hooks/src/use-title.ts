import { titleState$ } from '@creditwave/utils';
import React from 'react';

export function usePageTitle() {
  const [title, setTitle] = React.useState(titleState$.get());

  titleState$.onChange((e) => setTitle(e.value));

  return { title, setTitle };
}

export function useTitle(title: string) {
  React.useEffect(() => {
    titleState$.set(title);
  }, [title]);
}
