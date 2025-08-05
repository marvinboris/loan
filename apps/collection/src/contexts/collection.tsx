import { CollectionLoanProps } from '@creditwave/ui';
import React from 'react';

export type Data =
  | {
      detail: CollectionLoanProps;
      kyc: any;
      mark: CollectionLoanProps[];
      contacts: any[];
      emergencyContacts: any[];
      personalizedContacts: any[];
      callHistory: any[];
      success: boolean;
    }
  | undefined;

const Context = React.createContext<Data>(undefined);

export const useCollection = () => React.useContext(Context);

export function CollectionProvider({
  children,
  ...props
}: React.PropsWithChildren<Data>) {
  return <Context.Provider value={props}>{children}</Context.Provider>;
}
