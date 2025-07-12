import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import React from 'react';
import { ChangePassword } from './change-password';

export type ProfileProps = { logout(): void };

export function Profile({ logout }: ProfileProps) {
  const [changingPassword, setChangingPassword] = React.useState(false);

  return (
    <>
      <ChangePassword show={changingPassword} setShow={setChangingPassword} />

      <Menu as="div" className="ml-auto">
        <MenuButton className="size-10 rounded-full flex items-center justify-center bg-primary text-white *:hover:bg-stone-100">
          P
        </MenuButton>

        <MenuItems
          anchor="bottom"
          className="*:py-2 *:px-4 *:truncate bg-white border outline-none rounded-md"
        >
          <MenuItem
            as="button"
            className="block data-focus:bg-blue-100"
            onClick={() => setChangingPassword(true)}
          >
            Change password
          </MenuItem>

          <MenuItem
            as="button"
            onClick={logout}
            className="block data-focus:bg-blue-100"
          >
            Logout
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );
}
