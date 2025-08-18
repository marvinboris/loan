import { useAuth } from '@creditwave/hooks';
import { cn } from '@creditwave/utils';
import {
  ArrowDownTrayIcon,
  ArrowUpIcon,
  ChartBarIcon,
  CheckCircleIcon,
  FolderIcon,
  PhoneArrowUpRightIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type NavItemProps = {
  to: string;
  label: string;
  icon?: typeof ArrowUpIcon;
  items?: NavItemProps[];
};

export function NavItems() {
  const { user } = useAuth();

  const navItems = {
    'all-customers': (
      <NavItem to="/all-customers" label="All customers" icon={UserGroupIcon} />
    ),
    telemarketing: (
      <NavItem
        to="/telemarketing"
        label="Telemarketing"
        icon={PhoneArrowUpRightIcon}
        items={[
          {
            to: '/performance-management',
            label: 'Performance management',
            items: [
              { label: 'Telemarketer monthly report', to: '/monthly' },
              { label: 'Telemarketer daily report', to: '/daily' },
              {
                label: 'Telemarketer team monthly report',
                to: '/team-monthly',
              },
              { label: 'Telemarketer team daily report', to: '/team-daily' },
            ],
          },
          { to: '/new-customers', label: 'Cases of new customers' },
          { to: '/old-customers', label: 'Cases of old customers' },
          {
            to: '/registered-customers',
            label: 'Cases of registered customers',
          },
        ]}
      />
    ),
    financial: (
      <NavItem
        to="/financial"
        label="Financial"
        icon={ChartBarIcon}
        items={[
          { to: '/repayment-inquiries', label: 'Repayment inquiries' },
          { to: '/loan-inquiry', label: 'Loan inquiry' },
        ]}
      />
    ),
    collection: (
      <NavItem
        to="/collection"
        label="Collection"
        icon={ArrowDownTrayIcon}
        items={[
          {
            to: '/performance-management',
            label: 'Performance management',
            items: [
              { label: 'Collection monthly report', to: '/monthly' },
              { label: 'Collection daily report', to: '/daily' },
              {
                label: 'Collection team monthly report',
                to: '/team-monthly',
              },
              { label: 'Collection team daily report', to: '/team-daily' },
            ],
          },
          { to: '/collection-case', label: 'Collection case' },
          { to: '/case-allocation', label: 'Case allocation' },
          {
            to: '/collection-records',
            label: 'Collection records',
          },
        ]}
      />
    ),
    operation: (
      <NavItem
        to="/operation"
        label="Operation"
        icon={FolderIcon}
        items={[
          { to: '/account', label: 'Account' },
          { to: '/group', label: 'Group' },
        ]}
      />
    ),
    validation: (
      <NavItem
        to="/validation"
        label="Validation"
        icon={CheckCircleIcon}
        items={[
          { to: '/kyc', label: 'KYC' },
          { to: '/borrow', label: 'Borrow' },
        ]}
      />
    ),
  };

  return (
    <div className="flex-1 overflow-auto pl-2.5">
      {Object.keys(user?.features || navItems).map(
        (feature) => navItems[feature as keyof typeof navItems]
      )}
    </div>
  );
}

function NavItem(props: NavItemProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(
    location.pathname.startsWith(props.to)
  );

  const isActive =
    location.pathname === props.to ||
    (!isOpen && location.pathname.startsWith(props.to));

  const icon = props.icon ? <props.icon className="size-5" /> : null;

  const content = (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          isActive ? 'text-primary bg-white' : 'text-white bg-primary',
          'text-lg p-2.5 flex items-center gap-2.5',
          props.items?.length && 'cursor-pointer'
        )}
        onClick={
          props.items?.length ? () => setIsOpen((open) => !open) : undefined
        }
      >
        {icon}

        {props.label}
      </div>

      {props.items?.length && isOpen ? (
        <div className="flex flex-col gap-2.5 pl-2.5">
          {props.items.map((item) => (
            <NavItem
              {...item}
              to={props.to + item.to}
              key={JSON.stringify(item)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );

  return props.items?.length ? (
    content
  ) : (
    <NavLink to={props.to}>{content}</NavLink>
  );
}
