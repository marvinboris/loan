import React from 'react';

export type LogoProps = {
  white?: boolean;
};

export function Logo(props: LogoProps) {
  return (
    <img
      className="h-9"
      alt="Logo"
      src={props.white ? '/logo-white.png' : '/logo.png'}
    />
  );
}
