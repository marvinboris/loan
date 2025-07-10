import { cn } from '@creditwave/utils';
import React from 'react';

export type FormGroupProps = React.PropsWithChildren<{
  for?: string;
  className?: string;
  innerClassName?: string;
  label?: React.ReactNode;
  labelClassName?: string;
  description?: React.ReactNode;
  descriptionClassName?: string;
  error?: React.ReactNode;
  errorClassName?: string;
  wrapperClassName?: string;
  inline?: boolean;
  required?: boolean;
  prepend?: React.ReactNode;
  prependClassname?: string;
  append?: React.ReactNode;
  appendClassname?: string;
}>;

export function FormGroup({
  className,
  label,
  labelClassName,
  description,
  descriptionClassName,
  error,
  errorClassName,
  wrapperClassName,
  inline,
  required,
  ...props
}: FormGroupProps) {
  return (
    <div className={cn({ 'flex items-center gap-2.5': inline }, className)}>
      {label ? (
        <label
          htmlFor={props.for}
          className={cn('text-sm block', labelClassName)}
        >
          {inline && required ? <span className="text-red-600">*</span> : null}
          {label}
          {!inline && required ? <span className="text-red-600">*</span> : null}
        </label>
      ) : null}

      {description ? (
        <p className={cn('text-gray-700', descriptionClassName)}>
          {description}
        </p>
      ) : null}

      <div
        className={cn(
          'border rounded-md flex p-2 *:flex-1',
          { 'flex-1': inline },
          wrapperClassName
        )}
      >
        {props.prepend ? (
          <div className={cn('!flex-0 self-center', props.prependClassname)}>
            {props.prepend}
          </div>
        ) : null}
        {props.children}
        {props.append ? (
          <div className={cn('!flex-0 self-center', props.appendClassname)}>
            {props.append}
          </div>
        ) : null}
      </div>

      {error ? (
        <p className={cn('text-red-600', errorClassName)}>{error}</p>
      ) : null}
    </div>
  );
}
