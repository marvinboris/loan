import { cn } from '@creditwave/utils';
import {
  Switch as HuiSwitch,
  SwitchProps as HuiSwitchProps,
} from '@headlessui/react';
import React from 'react';
import { FormGroup, FormGroupProps } from './group';

export type SwitchProps = HuiSwitchProps & FormGroupProps;

export function Switch({
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
}: SwitchProps) {
  if (props.checked === undefined) props.checked = false;

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
      <HuiSwitch
        {...props}
        className={cn(
          'group relative flex h-7 !w-14 cursor-pointer rounded-full bg-stone-200 p-1 ease-in-out focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white',
          { 'bg-primary': props.checked }
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
            { 'translate-x-7': props.checked }
          )}
        />
      </HuiSwitch>
    </FormGroup>
  );
}
