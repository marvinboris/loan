import { cn } from '@creditwave/utils';
import { observable } from '@legendapp/state';
import { observer, use$ } from '@legendapp/state/react';
import React from 'react';

export type ToastType = 'info' | 'success' | 'error' | 'warning';

const state$ = observable({
  visible: false,
  text: '',
  type: 'info' as ToastType,
});

let hideTimeout: NodeJS.Timeout | null = null;

export const Toast = observer(function () {
  const state = use$(state$);

  React.useEffect(() => {
    return () => {
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed z-50 left-5 transition-all duration-200 border rounded-md px-5 py-2.5',
        {
          'bg-sky-50 border-sky-600 text-sky-600': state.type === 'info',
          'bg-lime-50 border-lime-600 text-lime-600': state.type === 'success',
          'bg-red-50 border-red-600 text-red-600': state.type === 'error',
          'bg-amber-50 border-amber-600 text-amber-600':
            state.type === 'warning',
        },
        state.visible ? 'bottom-5' : '-bottom-80'
      )}
    >
      {state.text}
    </div>
  );
});

export const toastShow = ({
  type,
  text,
  duration = 5000,
}: {
  type?: ToastType;
  text: string;
  duration?: number;
}) => {
  // Clear any pending hide operation
  if (hideTimeout) clearTimeout(hideTimeout);

  // Immediately show the new toast
  state$.assign({
    visible: true,
    text,
    type: type || 'error', // Default to error for your use case
  });

  // Set timeout to hide toast after duration
  hideTimeout = setTimeout(() => {
    state$.visible.set(false);
  }, duration);
};
