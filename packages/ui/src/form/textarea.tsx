import { cn } from '@creditwave/utils';
import * as React from 'react';
import { FormGroup, FormGroupProps } from './group';

export type TextAreaProps = React.ComponentProps<'textarea'> & FormGroupProps;

export function TextArea({
  className,
  description,
  descriptionClassName,
  error,
  errorClassName,
  inline,
  label,
  labelClassName,
  wrapperClassName,
  prepend,
  prependClassname,
  append,
  appendClassname,
  ...props
}: TextAreaProps) {
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
      <textarea
        {...props}
        className={cn('w-full outline-none text-sm', props.innerClassName)}
      />
    </FormGroup>
  );
}
