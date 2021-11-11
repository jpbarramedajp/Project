import React, { createContext, useContext, useMemo } from 'react';

export const LayoutContext = createContext(null);

export const LayoutProvider = ({ ...props }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const contextValue = useMemo(
    () => ({
      drawerOpen,
      setDrawerOpen,
    }),
    [drawerOpen, setDrawerOpen],
  );
  return <LayoutContext.Provider value={contextValue} {...props} />;
};

export const useLayoutContext = () => useContext(LayoutContext);
