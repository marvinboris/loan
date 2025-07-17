import { cn } from '@creditwave/utils';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import * as React from 'react';

export type ButtonProps = React.ComponentProps<'button'> & {
  color?:
    | 'primary'
    | 'success'
    | 'error'
    | 'warning'
    | 'disabled'
    | 'black'
    | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'solid' | 'clear' | 'outline';
  icon?: typeof ArrowUpIcon;
  iconRight?: boolean;
  loading?: boolean;
};

export function Button({
  className,
  color = 'primary',
  size = 'md',
  variant = 'solid',
  icon: Icon,
  iconRight,
  loading,
  children,
  ...props
}: ButtonProps) {
  if (loading) props.onClick = undefined;

  if (props.disabled) color = 'disabled';

  const icon = Icon ? <Icon className="size-4" /> : null;

  return (
    <button
      {...props}
      className={cn(
        'p-2 rounded-md transition-all duration-200 flex items-center justify-center gap-2',
        variant === 'solid'
          ? {
              'bg-primary hover:bg-primary/90': color === 'primary',
              'bg-black hover:bg-black/90': color === 'black',
              'bg-white hover:bg-stone-50': color === 'white',
              'bg-stone-200 enabled:hover:bg-stone-200/90':
                color === 'disabled',
            }
          : 'bg-transparent',
        variant === 'outline' && {
          'border-primary hover:bg-primary': color === 'primary',
          'border-black hover:bg-black': color === 'black',
          'border-white hover:bg-white': color === 'white',
          'border-stone-200 enabled:hover:bg-stone-200': color === 'disabled',
        },
        variant === 'solid'
          ? color === 'white'
            ? 'text-reset'
            : 'text-white'
          : {
              'text-primary': color === 'primary',
              'text-black': color === 'black',
              'text-white': color === 'white',
              'text-stone-400': color === 'disabled',
            },
        variant === 'outline' && 'border enabled:hover:text-white',
        {
          'text-sm': size === 'md',
        },
        className
      )}
    >
      {loading ? (
        <div className="animate-spin size-4 rounded-full border-2 border-t-transparent text-white" />
      ) : (
        <>
          {!iconRight ? icon : null}

          {children}

          {iconRight ? icon : null}
        </>
      )}
    </button>
  );
}
