import { cn } from '@creditwave/utils';
import React from 'react';
import { FormGroup, FormGroupProps } from './group';

export type RadioProps = Omit<React.ComponentProps<'div'>, 'onChange'> &
  FormGroupProps & {
    options: Record<string, string>;
    name: string;
    value?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };

export function Radio({
  className,
  description,
  descriptionClassName,
  error,
  errorClassName,
  inline,
  label,
  labelClassName,
  options,
  wrapperClassName,
  prepend,
  prependClassname,
  append,
  appendClassname,
  ...props
}: RadioProps) {
  return (
    <FormGroup
      for={props.id}
      className={className}
      label={label}
      labelClassName={labelClassName}
      description={description}
      descriptionClassName={descriptionClassName}
      error={error}
      errorClassName={errorClassName}
      wrapperClassName={cn('border-0', wrapperClassName)}
      inline={inline}
      required={props.required}
      prepend={prepend}
      prependClassname={prependClassname}
      append={append}
      appendClassname={appendClassname}
    >
      <div
        {...props}
        className={cn(
          'flex-1 outline-none text-sm bg-transparent grid',
          props.innerClassName
        )}
      >
        {Object.entries(options).map(([value, label], index) => (
          <div key={props.id + '-' + index}>
            <input
              type="radio"
              value={value}
              name={props.name}
              onChange={props.onChange}
              id={props.name + '-' + value}
              checked={value === props.value}
            />

            <label htmlFor={props.name + '-' + value} className="ml-1">
              {label}
            </label>
          </div>
        ))}
      </div>
    </FormGroup>
  );
}
