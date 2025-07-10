import { cn } from '@creditwave/utils';
import React from 'react';

export type CardProps = React.ComponentProps<'div'> & {};

export function Card({ className, ...props }: CardProps) {
  return (
    <div {...props} className={cn('border p-4 bg-white rounded-md', className)} />
  );
}
