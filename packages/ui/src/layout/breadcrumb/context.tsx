import React from 'react';

const Context = React.createContext<{
  breadcrumb: string[] | undefined;
  setBreadcrumb: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}>({
  breadcrumb: undefined,
  setBreadcrumb: () => {},
});

export const useBreadcrumb = () => React.useContext(Context);

export function BreadcrumbProvider(props: React.PropsWithChildren) {
  const [breadcrumb, setBreadcrumb] = React.useState<string[]>();

  return (
    <Context.Provider value={{ breadcrumb, setBreadcrumb }}>
      {props.children}
    </Context.Provider>
  );
}
