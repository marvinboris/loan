import { cn } from '@creditwave/utils';
import React from 'react';
import { useBreadcrumb as use } from './context';

export { BreadcrumbProvider } from './context';

export function Breadcrumb() {
  const { breadcrumb } = use();

  return (
    <div className="flex gap-2">
      {breadcrumb?.map((item, index) => (
        <React.Fragment key={'Breadcrumb-' + index}>
          {index === 0 ? null : <div className="text-lg opacity-50">/</div>}
          <div
            className={cn('text-lg', {
              'text-primary': index + 1 === breadcrumb.length,
            })}
          >
            {item}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export function useBreadcrumb(value: string[]) {
  const { setBreadcrumb } = use();

  React.useEffect(() => {
    setBreadcrumb(value);
  }, [value.toString()]);
}
