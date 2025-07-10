import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ChangePassword } from './change-password';

export function Profile() {
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
          <MenuItem>
            <button
              className="block data-focus:bg-blue-100"
              onClick={() => setChangingPassword(true)}
            >
              Change password
            </button>
          </MenuItem>

          <MenuItem>
            <Link className="block data-focus:bg-blue-100" to="/login">
              Logout
            </Link>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );
}
