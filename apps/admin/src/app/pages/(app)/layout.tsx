import { Breadcrumb, Profile, Sidebar } from '@creditwave/ui';
import React from 'react';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="h-screen w-screen overflow-clip flex">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-[60px] px-5 border-b border-stone-400 flex items-center">
          <Breadcrumb />

          <Profile />
        </header>

        <main className="flex-1 overflow-auto px-5 py-4 flex flex-col gap-2.5">
          <Outlet />
        </main>

        <footer></footer>
      </div>
    </div>
  );
}
