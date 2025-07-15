import { cn } from '@creditwave/utils';
import React from 'react';
import { FormGroup, FormGroupProps } from './group';

export type SelectProps = React.ComponentProps<'select'> &
  FormGroupProps & {
    options: Record<string, string>;
  };

export function Select({
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
}: SelectProps) {
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
      wrapperClassName={wrapperClassName}
      inline={inline}
      required={props.required}
      prepend={prepend}
      prependClassname={prependClassname}
      append={append}
      appendClassname={appendClassname}
    >
      <select
        {...props}
        className={cn(
          'w-full outline-none text-sm bg-transparent',
          props.innerClassName
        )}
      >
        {Object.entries(options).map(([value, label], index) => (
          <option key={props.id + '-' + index} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FormGroup>
  );
}
