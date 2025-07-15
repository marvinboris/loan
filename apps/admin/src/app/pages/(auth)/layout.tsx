import { useAuth } from '@creditwave/hooks';
import { Logo } from '@creditwave/ui';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export function AuthLayout() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated && user) navigate('/');
  }, [isAuthenticated, user]);

  return (
    <>
      <header></header>

      <main className="min-h-screen flex flex-col justify-center items-center gap-2">
        <Logo />

        <div className="h-72 flex flex-col justify-center">
          <Outlet />
        </div>
      </main>

      <footer></footer>
    </>
  );
}
