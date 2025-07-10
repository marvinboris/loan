import React from 'react';
import { NavItems } from './nav-items';
import { Logo } from '../logo';

export function Sidebar() {
  return (
    <aside className="bg-primary self-stretch w-80 flex flex-col gap-2.5">
      <div className="h-[60px] mx-2.5 px-1.5 border-b border-stone-400 flex items-center">
        <Logo white />
      </div>

      <NavItems />
    </aside>
  );
}
