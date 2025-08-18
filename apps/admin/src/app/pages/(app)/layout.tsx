import { useAuth } from '@creditwave/hooks';
import { Breadcrumb, Profile, Sidebar, toastShow } from '@creditwave/ui-web';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { authService } from '../../services';
import { Bars3Icon } from '@heroicons/react/24/outline';

export function AppLayout() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    if (!isAuthenticated || !user) navigate('/login');
  }, [isAuthenticated, user]);

  return (
    <div className="h-screen w-screen overflow-clip flex">
      <Sidebar show={show} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-[60px] px-5 gap-4 border-b border-stone-400 flex items-center">
          <Bars3Icon
            className="size-6 cursor-pointer"
            onClick={() => setShow((s) => !s)}
          />

          <Breadcrumb />

          <Profile
            logout={authService.logout}
            changePassword={async (data) => {
              const result = await authService.changePassword(data);
              if (result.success)
                toastShow({ type: 'success', text: result.message });
            }}
          />
        </header>

        <main className="flex-1 overflow-auto px-5 py-4 flex flex-col gap-2.5">
          <Outlet />
        </main>

        <footer></footer>
      </div>
    </div>
  );
}
