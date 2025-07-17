import { cn } from '@creditwave/utils';
import * as React from 'react';
import { FormGroup, FormGroupProps } from './group';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export type InputProps = React.ComponentProps<'input'> & FormGroupProps;

export function Input({
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
}: InputProps) {
  const [type, setType] = React.useState(props.type);

  if (props.type === 'password') {
    props.placeholder = '********';
    const Icon = type === 'password' ? EyeIcon : EyeSlashIcon;
    append = (
      <Icon
        className="size-4"
        onClick={() => setType(type === 'password' ? 'text' : 'password')}
      />
    );
  }

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
      <input
        {...props}
        type={type}
        className={cn('w-full outline-none text-sm', props.innerClassName)}
      />
    </FormGroup>
  );
}
